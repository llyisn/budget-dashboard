import { widgetColorSchemas } from "../../config/widgetColorSchemas"

//temporary
export const globalColors = {
    "main": "#fff",
    "text": "#200303",
    "border": "#200303",
    "text-title": "#000000",
    "buttons": "#fff"
  }

export function resolveWidgetColors(widgetType, savedColors, globalColors) {
    /**[
        {
            key: 'main',
            label: 'main background',
            default: '#e3ddcf',
            global: true
        },

        {
            key: 'text',
            label: 'text',
            default: '#200303',
            global: true,

            children: [
                { key: 'text-title', label: 'title'},
                { key: 'text-labels', label: 'labels'},
            ]
        }, ...] */
  const settings = widgetColorSchemas[widgetType] ?? [] //havent finished schema
  let resolved = {}

      //priority: individually saved color > parent saved color > global saved color > fallback (default)
      const resolveColor = (slot, fallback) => {
        if (savedColors[slot.key]) return savedColors[slot.key] //ind. saved color
        if (slot.global && globalColors[slot.key]) return globalColors[slot.key] //global color
        return fallback //for parent hardcoded default, for child parent
      }

      for (const slot of settings) {
        const parentColor = resolveColor(slot, slot.default)
        resolved[slot.key] = parentColor
        
        if (slot.children) {
          for (const child of slot.children) {
            resolved[child.key] = resolveColor(child, parentColor)
          }
        }
      }
      
      return resolved
   }


export function getColorChanges(colorSlots, key, color) {
    const changes = { [key]: color}
    const parentSlot = colorSlots.find(slot => slot.key === key)

    if (parentSlot?.children) {
      for (const child of parentSlot.children) {
        changes[child.key] = color
      }
    }
    return changes
  }