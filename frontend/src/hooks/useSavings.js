import { fakeSavings } from "../data/fakeData"

const useSavings = () => {
    const goals = fakeSavings.filter(entry => entry.type === 'goal')
    return { goals }
}
export default useSavings
