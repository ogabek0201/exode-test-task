import styled from 'styled-components'

export const Card = styled.section`
  background: #ffffff;
  border: 1px solid rgba(100, 108, 255, 0.25);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
`

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 12px;
`

export const Button = styled.button<{ $variant?: 'primary' | 'danger' }>`
  ${({ $variant }) =>
    $variant === 'primary'
      ? 'background-color: var(--color-primary); color: white;'
      : $variant === 'danger'
        ? 'background-color: var(--color-danger); color: white;'
        : ''}
  border-color: rgba(0,0,0,0.08);
  transition:
    transform 0.06s ease,
    box-shadow 0.2s ease;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05);
  &:hover {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  &:active {
    transform: translateY(1px);
  }
`

export const PairsBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin: 8px 0 16px;
`

export const EmptyHint = styled.div`
  opacity: 0.7;
  font-size: 13px;
`

export const PairChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 999px;
  background: rgba(100, 108, 255, 0.12);
  border: 1px solid rgba(100, 108, 255, 0.25);
`

export const ChipIndex = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  font-size: 12px;
`

export const ChipText = styled.span`
  font-size: 13px;
`

export const ChipRemove = styled.button`
  padding: 2px 6px;
  font-size: 14px;
  line-height: 1;
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.15);
  color: inherit;
`
