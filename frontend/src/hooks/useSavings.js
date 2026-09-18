import { fakeSavings, previewSavings } from "../data/fakeData"

const useSavings = (preview=false) => {
    const goals = (preview ? previewSavings : fakeSavings).filter(entry => entry.type === 'goal')
    return { goals }
}
export default useSavings
