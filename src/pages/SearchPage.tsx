import * as React from 'react'
import { Picker, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import styled from 'styled-components/native'
import {
  Container,
  InputBox,
  SearchIcon,
  ArrowUpIcon,
  TouchableView,
  H2
} from '../atoms'
import pickerItems from '../utils/createPickerItems'

const ShowQueryArea = styled(Container)`
  flex-direction: row;
  padding-horizontal: 10;
`

const QueryWord = styled(H2)`
  margin-horizontal: 10;
  padding-horizontal: 20;
  padding-vertical: 5;
  border-radius: 10;
  border-color: #ffffff;
  border-width: 1;
`

const SearchButton = styled(TouchableView)`
  margin-left: auto;
`

const KeyWordBox = styled(InputBox)`
  height: 30;
  padding-horizontal: 10;
`

const ItemTitle = styled(H2)`
  padding-vertical: 10;
`

const ModalCloseButton = styled(TouchableView)`
  margin-top: 20;
  border-radius: 20;
  border-width: 1;
  border-color: #ffffff;
`

const SearchBar = styled(Container)`
  flex-direction: row;
  padding-top: 10;
  padding-horizontal: 30;
  width: 100%;
  height: 80;
  background-color: #2ecc71;
`

const StyledModal = styled(Modal)`
  height: 100;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 80;
  margin-bottom: 100;
  padding-horizontal: 30
  padding-vertical: 30
  border-radius: 30;
  background-color: #2ecc71;
`

const styles = StyleSheet.create({
  font: {
    fontFamily: 'regular'
  }
})

interface State {
  modalVisible: boolean
  language: string
  keyword: string
}

export default class SearchPage extends React.Component<{}, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      modalVisible: false,
      language: '',
      keyword: ''
    }
  }

  setModalVisible(visible: boolean): void {
    this.setState({ modalVisible: visible })
  }

  setPickerValue(value: string): void {
    this.setState({ language: value })
  }

  setKeyword(value: string): void {
    this.setState({ keyword: value })
  }

  render() {
    return (
      <Container>
        <SearchBar>
          <ShowQueryArea>
            {this.state.language && (
              <QueryWord style={styles.font} color={'#ffffff'}>
                {this.state.language}
              </QueryWord>
            )}
            {this.state.keyword && (
              <QueryWord style={styles.font} color={'#ffffff'}>
                {this.state.keyword}
              </QueryWord>
            )}
          </ShowQueryArea>
          <SearchButton
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}
          >
            <SearchIcon size={20} color={'#ffffff'} />
          </SearchButton>
        </SearchBar>
        <StyledModal
          animationIn={'slideInDown'}
          animationOut={'slideOutUp'}
          backdropOpacity={0.7}
          isVisible={this.state.modalVisible}
          swipeDirection={'up'}
          onSwipe={() => {
            this.setModalVisible(!this.state.modalVisible)
          }}
        >
          <ItemTitle style={styles.font} color={'#ffffff'}>
            {'Select Language'}
          </ItemTitle>
          <Picker
            selectedValue={this.state.language}
            onValueChange={(itemValue, itemIndex) =>
              this.setPickerValue(itemValue)
            }
          >
            {pickerItems.map(val => {
              // 要リファクタ
              const key = Object.keys(val)[0]
              return (
                <Picker.Item
                  color={'#ffffff'}
                  key={`item-${key}`}
                  label={val[key]}
                  value={val[key]}
                />
              )
            })}
          </Picker>
          <ItemTitle style={styles.font} color={'#ffffff'}>
            {'Input Keyword'}
          </ItemTitle>
          <KeyWordBox
            style={styles.font}
            onChangeText={(text: string) => this.setKeyword(text)}
            value={this.state.keyword}
          />
          <ModalCloseButton
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}
          >
            <ArrowUpIcon color={'#ffffff'} size={40} />
          </ModalCloseButton>
        </StyledModal>
      </Container>
    )
  }
}
