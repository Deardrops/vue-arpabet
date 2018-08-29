const app = new Vue({
  el: '#app',
  data: {
    input: '',
  },
  computed: {
    lines() {
      let lines = this.input.split('\n')
      return lines.map(line => line.trim())
    },
    newLines() {
      return this.lines.map(line => {
        let words = line.toLowerCase().match(/\w+(')?(\w+)?/g)
        if (!words) return
        words = words.map(word => word.trim())
        // let outputLine = ''
        return words.reduce((newLine, word) => {
          if (!word) return ''
          let arpabet = Dict.get(word)
          if (!arpabet) return ''
          arpabet = arpabet.toLowerCase().replace(/\d/g, '')
          return newLine + ' ' + arpabet
        }, '')
      })
    },
    output() {
      return this.newLines.join('\n')
    }
  }
})

fetch('/cmudict/cmudict.dict')
  .then(response => response.text())
  .then(text => initDict(text))

const Dict = new Map()

function initDict(text) {
  if (!text) return
  for (let line of text.split('\n')) {
    const index = line.indexOf(' ')
    const key = line.substring(0, index)
    const value = line.substring(index + 1)
    Dict.set(key, value)
  }
}
