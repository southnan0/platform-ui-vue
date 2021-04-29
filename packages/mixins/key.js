import { formatKeyName, parseKeyName,parseMulKeyName } from 'oa-ui/src/utils/parseLabelAndKey'

export default {
  props: {
    valueAndLabel: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getKeyName(key, label) {
      if (this.valueAndLabel) {
        return formatKeyName(key, label)
      }
      return key
    },
    getKeyValue(value) {
      if (this.valueAndLabel) {
        if(Array.isArray(value)){
          const [keyValue] = parseMulKeyName(value)
          return (keyValue || '').split(',')
        }else{
          const [keyValue] = parseKeyName(
            value
          )
          return keyValue
        }
        
      }
      return value
    }
  }
}
