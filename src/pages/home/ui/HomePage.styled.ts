import styled from 'styled-components'

export const Page = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  position: relative;
  width: 100%;
`

export const Title = styled.h1`
  font-size: 28px;
  margin: 0;
`

export const Subtitle = styled.p`
  margin: 0;
  opacity: 0.8;
  font-size: 14px;
`

// Widget-specific styles were moved to src/widgets/matcherPanel/ui/MatcherPanel.styled.ts
