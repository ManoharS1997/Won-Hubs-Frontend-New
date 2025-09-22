
import {
    ProgressContainer, ProgressBar, CircularProgressContainer,
    CircularProgress, CircleBg, Circle, Percentage
} from './StyledComponents'

export default function CircularProgressBar({ loadingPercentage, type }) {
    console.log(loadingPercentage)
    const BarProgress = () => (
        <ProgressContainer>
            <ProgressBar style={{ width: `${loadingPercentage}%` }}>
                {loadingPercentage}%
            </ProgressBar>
        </ProgressContainer>
    )

    const CircularProgressLoader = () => (
        <CircularProgressContainer>
            <CircularProgress viewBox="0 0 36 36">
                <CircleBg
                    d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <Circle
                    strokeDasharray={`${loadingPercentage}, 100`}
                    d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <Percentage x="18" y="20">
                    {Math.round(loadingPercentage)}%
                </Percentage>
            </CircularProgress>
        </CircularProgressContainer>
    )

    switch (type) {
        case 'bar':
            return <BarProgress />
        case 'circular':
            return <CircularProgressLoader />
        default:
            return <CircularProgressLoader />
    }
}