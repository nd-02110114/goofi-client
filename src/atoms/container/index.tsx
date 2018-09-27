import styled from 'styled-components/native'

export interface Props {
  flex?: number
  row?: boolean
}

const Container = styled.View<Props>`
  flex: ${props => props.flex};
  flex-direction: ${props => (props.row ? 'row' : 'column')};
  align-items: center;
`

Container.defaultProps = {
  flex: 1,
  row: false
}

export default Container
