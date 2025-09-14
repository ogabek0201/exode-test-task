import { Header, Page, Subtitle, Title } from './HomePage.styled'
import { MatcherPanel } from '@/widgets/matcherPanel'

const leftItems = ['A', 'B', 'C', 'D']
const rightItems = ['1', '2', '3', '4']

export const HomePage = () => {
  return (
    <Page>
      <Header>
        <Title>Matcher</Title>
        <Subtitle>Drag between columns to create pairs. Click a line to remove.</Subtitle>
      </Header>
      <MatcherPanel leftItems={leftItems} rightItems={rightItems} />
    </Page>
  )
}
