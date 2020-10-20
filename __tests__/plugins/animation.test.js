import invokePlugin from '../util/invokePlugin'
import plugin from '../../src/plugins/animation'

test('defining animation and keyframes', () => {
  const config = {
    theme: {
      animation: {
        none: 'none',
        spin: 'spin 1s linear infinite',
        ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        spin: { to: { transform: 'rotate(360deg)' } },
        ping: { '75%, 100%': { transform: 'scale(2)', opacity: '0' } },
      },
    },
    variants: {
      animation: [],
    },
  }

  const { utilities } = invokePlugin(plugin(), config)

  expect(utilities).toEqual([
    [
      {
        '@keyframes ping': { '75%, 100%': { opacity: '0', transform: 'scale(2)' } },
        '@keyframes spin': { to: { transform: 'rotate(360deg)' } },
      },
      { respectImportant: false },
    ],
    [
      {
        '.animate-none': { animation: 'none' },
        '.animate-ping': { animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite' },
        '.animate-spin': { animation: 'spin 1s linear infinite' },
      },
      [],
    ],
  ])
})

test('defining animation and keyframes with prefix', () => {
  const config = {
    prefix: 'tw-',
    theme: {
      animation: {
        none: 'none',
        spin: 'spin 1s linear infinite',
        ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        spin: { to: { transform: 'rotate(360deg)' } },
        ping: { '75%, 100%': { transform: 'scale(2)', opacity: '0' } },
      },
    },
    variants: {
      animation: [],
    },
  }

  const { utilities } = invokePlugin(plugin(), config)

  expect(utilities).toEqual([
    [
      {
        '@keyframes tw-ping': { '75%, 100%': { opacity: '0', transform: 'scale(2)' } },
        '@keyframes tw-spin': { to: { transform: 'rotate(360deg)' } },
      },
      { respectImportant: false },
    ],
    [
      {
        '.animate-none': { animation: 'none' },
        '.animate-ping': { animation: 'tw-ping 1s cubic-bezier(0, 0, 0.2, 1) infinite' },
        '.animate-spin': { animation: 'tw-spin 1s linear infinite' },
      },
      [],
    ],
  ])
})
