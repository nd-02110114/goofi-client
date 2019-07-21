import React, { useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import styled from 'styled-components/native'

import { Container } from '../../atoms'
import { IssueListItem } from '../../molecules'
import { IssueHeader, WebViewModal } from '../../organisms'
import { PAGE_BACK_GROUND } from '../../../assets'

import {
  useQuery,
  useMutation,
  GET_FAV_ITEMS,
  ADD_FAV_ITEM,
  DELETE_FAV_ITEM
} from '../../apollo'
import { createIssueItems, judgeIsFavItem } from '../../utils'
import { IssueItem } from '../../types'

const IssueListPageContainer = styled(Container)`
  background-color: ${PAGE_BACK_GROUND};
`

const styles = StyleSheet.create({
  listViewContainerStyle: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: PAGE_BACK_GROUND
  }
})

interface Props {
  navigation: {
    getParam: (key: string) => any
    goBack: () => any
  }
}

const initialIssueItem = {
  id: '',
  title: '',
  url: '',
  avatarUrl: ''
}

export default function IssueListPage(props: Props) {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedIssueItem, setSelectedIssueItem] = useState<IssueItem>(
    initialIssueItem
  )
  const { data } = useQuery<{ favItems: IssueItem[] }>(GET_FAV_ITEMS)
  const [addFavItem] = useMutation(ADD_FAV_ITEM, {
    variables: { ...selectedIssueItem }
  })
  const [deleteFavItem] = useMutation(DELETE_FAV_ITEM, {
    variables: { ...selectedIssueItem }
  })

  const onPressIssue = (item: IssueItem): void => {
    setSelectedIssueItem(item)
    setModalVisible(!modalVisible)
  }

  const { navigation } = props
  const { nodes } = navigation.getParam('issues')
  const issueItems = createIssueItems(nodes)
  const favStatus = judgeIsFavItem(selectedIssueItem, data)
  return (
    <IssueListPageContainer testID="issueListPage">
      <IssueHeader onPressGoBack={navigation.goBack} />
      <ScrollView contentContainerStyle={styles.listViewContainerStyle}>
        {issueItems.map((item, index) => (
          <IssueListItem
            key={`issue-${item.id}`}
            index={index}
            item={item}
            onPress={onPressIssue}
          />
        ))}
      </ScrollView>
      <WebViewModal
        favStatus={favStatus}
        isVisible={modalVisible}
        selectedIssueItem={selectedIssueItem}
        onPressBackBtn={setModalVisible}
        onPressFavBtn={favStatus ? deleteFavItem : addFavItem}
      />
    </IssueListPageContainer>
  )
}
