import _ from 'lodash'
import nameClass from '../util/nameClass'
import animationParser from '../util/animationParser'

export default function () {
  return function ({ addUtilities, theme, variants, config }) {
    const prefix = config('prefix')
    const keyframesConfig = theme('keyframes')
    const keyframesStyles = _.mapKeys(
      keyframesConfig,
      (_keyframes, name) => `@keyframes ${prefix === undefined ? name : [prefix, name].join('')}`
    )

    addUtilities(keyframesStyles, { respectImportant: false })

    const animationConfig = theme('animation')
    const utilities = _.mapValues(
      _.mapKeys(animationConfig, (_animation, suffix) => nameClass('animate', suffix)),
      prefix === undefined
        ? (animation) => ({ animation })
        : function (animation) {
            const { name } = animationParser(animation)
            if (name === undefined) return { animation }
            return { animation: animation.replace(name, [prefix, name].join('')) }
          }
    )
    addUtilities(utilities, variants('animation'))
  }
}
