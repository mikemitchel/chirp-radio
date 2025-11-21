import { registerPlugin } from '@capacitor/core'

export interface NavigationBarInfoPlugin {
  getNavigationBarHeight(): Promise<{ height: number }>
}

const NavigationBarInfo = registerPlugin<NavigationBarInfoPlugin>('NavigationBarInfo')

export default NavigationBarInfo
