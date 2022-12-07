import { Fragment, useRef, useState, useCallback } from 'react'
import { useFloating, flip, offset, shift, arrow } from '@floating-ui/react-dom'
import { Popover, Transition } from '@headlessui/react'
import { HexColorPicker, HexColorInput } from 'react-colorful'
import Modal from './Modal'

const positions = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
}

function ColorInput({ color, onChange, id }) {
  const arrowRef = useRef(null)
  const {
    x,
    y,
    reference,
    floating,
    strategy,
    placement,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = useFloating({
    strategy: 'absolute',
    placement: 'bottom',
    middleware: [offset(10), shift({ padding: 16 }), flip(), arrow({ element: arrowRef })],
    // whileElementsMounted: autoUpdate,
  })

  const staticSide = positions[placement.split('-')[0]]

  return (
    <div className="relative">
      <HexColorInput
        id={id}
        placeholder="HEX code"
        color={color}
        onChange={onChange}
        type="text"
        className="input pr-9"
        prefixed
      />
      <Popover className="absolute inset-y-0 right-0 w-11 p-2">
        <Popover.Button
          ref={reference}
          className="h-7 w-7 rounded-md bg-gray-100 shadow-inner"
          style={{ background: color }}
        />
        <Transition
          as={Fragment}
          enter="transition duration-150 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Popover.Panel
            ref={floating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            className="z-50 rounded-lg border bg-white p-4 shadow-lg"
          >
            <div
              ref={arrowRef}
              className="absolute h-3 w-3 rotate-45 rounded-sm bg-white"
              style={{
                left: arrowX ?? '',
                top: arrowY ?? '',
                [staticSide]: '-6px',
              }}
            />
            <HexColorPicker color={color} onChange={onChange} />
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}

function GradientMaker({ gradient = {}, onMake }) {
  const [newGradient, setNewGradient] = useState(gradient)

  const { start, end, name } = newGradient

  const handleColorChange = useCallback(
    key => color => {
      setNewGradient(_gradient => ({ ..._gradient, [key]: color }))
    },
    []
  )

  const handleNameChange = useCallback(e => {
    setNewGradient(_gradient => ({ ..._gradient, name: e.target.value }))
  }, [])

  const handleSubmit = useCallback(
    e => {
      e.preventDefault()
      onMake?.(newGradient)
    },
    [newGradient, onMake]
  )

  return (
    <div className="flex flex-col gap-6 lg:flex-row-reverse">
      <div
        className="min-h-swatch rounded-lg bg-gray-200/90 lg:basis-1/2"
        style={{ backgroundImage: `linear-gradient(to right, ${start}, ${end})` }}
      />
      <form className="flex-1" onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-4">
          <div className="grow basis-52">
            <label htmlFor="gradient-start" className="text-xs font-medium">
              Start Color
            </label>
            <ColorInput id="gradient-start" color={start} onChange={handleColorChange('start')} />
          </div>
          <div className="grow basis-52">
            <label htmlFor="gradient-end" className="text-xs font-medium">
              End Color
            </label>
            <ColorInput id="gradient-end" color={end} onChange={handleColorChange('end')} />
          </div>
        </div>
        <div className="my-4">
          <label htmlFor="gradient-name" className="text-xs font-medium">
            Gradient Name
          </label>
          <input
            id="gradient-name"
            value={name}
            onChange={handleNameChange}
            placeholder="unique name"
            type="text"
            className="input"
          />
        </div>
        <div className="pt-1 text-right">
          <button type="submit" className="btn btn-primary lg:w-full">
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

function GradientAdd({ open, onClose, gradient, onAdd }) {
  const handleMake = useCallback(
    newGradient => {
      onAdd?.(newGradient)
      onClose?.()
    },
    [onAdd, onClose]
  )

  return (
    <Modal open={open} onClose={onClose} className="lg:max-w-2xl">
      <Modal.Title>Add New Gradient</Modal.Title>
      <GradientMaker gradient={gradient} onMake={handleMake} />
    </Modal>
  )
}

export default GradientAdd
