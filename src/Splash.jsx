import { Jelly } from '@uiball/loaders'

function Splash() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-fuchsia-400">
      <Jelly size={80} speed={0.9} color="currentcolor" />
      <p className="mt-6 bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-3xl font-bold text-transparent sm:text-5xl">
        Gradientti..
      </p>
    </div>
  )
}

export default Splash
