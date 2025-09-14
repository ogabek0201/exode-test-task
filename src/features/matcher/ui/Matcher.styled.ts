import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  user-select: none;
  min-height: 280px;
  background: rgba(0, 0, 0, 0.02);
  border: 1px dashed rgba(100, 108, 255, 0.3);
  border-radius: 10px;
  overflow: hidden;
  touch-action: none;
`

export const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 20px 20px;
`

export const ColumnTitle = styled.div`
  font-size: 12px;
  opacity: 0.7;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`

export const Item = styled.div<{ $paired?: boolean; $active?: boolean; $hover?: boolean }>`
  position: relative;
  padding: 12px 16px;
  background: ${({ $paired }) => ($paired ? 'rgba(22,163,74,0.15)' : 'rgba(0,0,0,0.06)')};
  border: 2px solid
    ${({ $paired, $active, $hover }) =>
      $active
        ? 'rgba(22,163,74,0.9)'
        : $hover
          ? 'rgba(22,163,74,0.7)'
          : $paired
            ? 'rgba(22,163,74,0.6)'
            : 'rgba(0,0,0,0.12)'};
  border-radius: 12px;
  text-align: left;
  cursor: pointer;
  transition:
    background 0.15s ease,
    transform 0.06s ease,
    box-shadow 0.15s ease,
    border-color 0.15s ease;
  box-shadow: ${({ $paired }) =>
    $paired ? '0 2px 10px rgba(22,163,74,0.15)' : '0 1px 4px rgba(0,0,0,0.06)'};
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.12);
  }
  &:active {
    transform: translateY(0);
  }
`

export const ItemContent = styled.div`
  pointer-events: none;
`

export const Socket = styled.span<{ $side: 'left' | 'right'; $active?: boolean }>`
  position: absolute;
  top: 50%;
  ${({ $side }) => ($side === 'left' ? 'left: -6px;' : 'right: -6px;')}
  width: 10px;
  height: 10px;
  transform: translateY(-50%);
  background: ${({ $active }) => ($active ? '#16a34a' : 'rgba(22,163,74,0.6)')};
  border: 2px solid #0e7a35;
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.6);
  pointer-events: none;
`

export const Svg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`

export const PathSolid = styled.path`
  stroke: #16a34a;
  stroke-width: 3;
  stroke-linecap: round;
  fill: none;
  pointer-events: stroke;
  opacity: 0.95;
  filter: drop-shadow(0 1px 0 rgba(0, 0, 0, 0.2));
  &:hover {
    stroke-width: 4;
    opacity: 1;
  }
`

export const PathDashed = styled.path`
  stroke: #16a34a;
  stroke-width: 2.5;
  stroke-linecap: round;
  fill: none;
  stroke-dasharray: 6 6;
  opacity: 0.9;
  filter: drop-shadow(0 1px 0 rgba(0, 0, 0, 0.2));
`

export const Endpoint = styled.circle`
  r: 4.5;
  fill: #16a34a;
  stroke: #0e7a35;
  stroke-width: 2px;
  pointer-events: none;
`
