import * as React from 'react'
import styled from 'styled-components/native'
import { ArrowUpIcon, TouchableView } from '../../atoms'
import { WHITE } from '../../../assets'

const TouchableArea = styled(TouchableView)`
  margin-top: 20;
  border-radius: 20;
  border-width: 1;
  border-color: ${WHITE};
`

interface Props {
  onPress: () => void
}

const ModalCloseButton = (props: Props) => {
  const { onPress } = props
  return (
    <TouchableArea onPress={() => onPress()}>
      <ArrowUpIcon color={WHITE} size={40} />
    </TouchableArea>
  )
}

export default ModalCloseButton
