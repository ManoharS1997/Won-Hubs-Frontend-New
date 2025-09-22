
const apiUrl = import.meta.env.VITE_HOSTED_API_URL
import axios from 'axios'
import Cookies from 'js-cookie'


const setNodesAndFormStates = (setFormData, setNodes, formData, data, nodeData) => {
  setFormData(prev => ({
    ...prev,
    test: {
      ...prev.test,
      testResult: {
        data: data.messages
      }
    }
  }))
  setNodes(prev => {
    return prev.map(node => node.id === nodeData.id ? ({
      ...node,
      data: {
        ...node.data,
        formData: {
          ...formData,
          test: {
            ...formData.test,
            testResult: {
              data: data.messages
            }
          }
        }
      }
    }) : node)
  })
}

// ================================================================ SLACK TEST CALL FUNCTIONS =======================================================
const testSlackQueryMatchedMessages = async (formData, setFormData, setIsTesting, setNodes, nodeData) => {
  // console.log('formdata:', formData);
  setIsTesting(true)
  try {
    const url = `${apiUrl}/api/slack/connections/get/query-matches/${formData.configure['Search Query'].value}/2`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log('slack channel latest messages: ', data)
    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: data.messages || data
        }
      }
    }))
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: data.messages || data
              }
            }
          }
        }
      }) : node)
    })
  } catch (err) {
    console.log(err)
  }
  setIsTesting(false)
}
const testSlackLatestMessages = async (formData, setFormData, setIsTesting, setNodes, nodeData) => {
  setIsTesting(true)
  try {
    const url = `${apiUrl}/api/slack/connections/conversation-history/${formData.configure.channel.value}`
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: JSON.parse(localStorage.getItem('activeUserData')).id })
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log('slack channel latest messages: ', data)
    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: data.data || data
        }
      }
    }))
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: data.data || data
              }
            }
          }
        }
      }) : node)
    })
  } catch (err) {
    console.log(err)
  }
  setIsTesting(false)
}
const testSlackNewFiles = async (formData, setFormData, setIsTesting, setNodes, nodeData) => {
  setIsTesting(true)
  try {
    const url = `${apiUrl}/api/slack/connections/get/user/files/${formData.configure.channel.value}`
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: JSON.parse(localStorage.getItem('activeUserData')).id })
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log('slack channel latest files: ', data)
    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: data.files || data
        }
      }
    }))
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: data.files || data
              }
            }
          }
        }
      }) : node)
    })
  } catch (err) {
    console.log(err)
  }
  setIsTesting(false)
}
const testMentions = async (formData, setFormData, setIsTesting, setNodes, nodeData) => {
  setIsTesting(true)
  try {
    const url = `${apiUrl}/api/slack/connections/get/mentions`
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: JSON.parse(localStorage.getItem('activeUserData')).id })
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log('slack channel latest mentions: ', data)
    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: data.mentions || data
        }
      }
    }))
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: data.mentions || data
              }
            }
          }
        }
      }) : node)
    })
  } catch (err) {
    console.log(err)
  }
  setIsTesting(false)
}
const testRecentChannels = async (formData, setFormData, setIsTesting, setNodes, nodeData) => {
  setIsTesting(true)
  try {
    const url = `${apiUrl}/api/slack/connections/get/recent-channels`
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: JSON.parse(localStorage.getItem('activeUserData')).id })
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log('slack channel latest mentions: ', data)
    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: data.channels || data
        }
      }
    }))
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: data.channels || data
              }
            }
          }
        }
      }) : node)
    })
  } catch (err) {
    console.log(err)
  }
  setIsTesting(false)
}
const testRecentMessagesInprivateChannel = async (formData, setFormData, setIsTesting, setNodes, nodeData) => {
  setIsTesting(true)
  try {
    const url = `${apiUrl}/api/slack/connections/get/private-channel-messages/${formData.configure.channel.value}`
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: JSON.parse(localStorage.getItem('activeUserData')).id })
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log('slack channel latest mentions: ', data)
    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: data.messages || data
        }
      }
    }))
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: data.messages || data
              }
            }
          }
        }
      }) : node)
    })
  } catch (err) {
    console.log(err)
  }
  setIsTesting(false)
}
const testSendDirectMessages = async (formData, setFormData, setIsTesting, setNodes, nodeData) => {
  setIsTesting(true)
  try {
    const url = `${apiUrl}/api/slack/connections/send/direct-message`
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: JSON.parse(localStorage.getItem('activeUserData')).id,
        message: formData.configure.message.value,
        channelUsers: formData.configure.users.value,
        sentAsBot: formData.configure['Send as a bot'].value,
        attachImageUrl: formData.configure['Attach Image by URL'].value,
        linkUsername: formData.configure['Link Usernames and Channel Names?'].value,
        scheduledAt: formData.configure['Scheduled at'].value,
      })
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log('slack direct message to user: ', data)
    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: [...data?.data, { response: data?.message ? `${data.message}` : 'Something Went Wrong!' }] || data
        }
      }
    }))
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: [...data?.data, { response: data?.message ? `${data.message}` : 'Something Went Wrong!' }] || data
              }
            }
          }
        }
      }) : node)
    })
  } catch (err) {
    console.log(err)
  }
  setIsTesting(false)
}
const fetchLatestMessageWithHashtag = async (formData, setFormData, setIsTesting, setNodes, nodeData) => {
  setIsTesting(true);

  try {
    const url = `${apiUrl}/api/slack/connections/get/hashtag-messages`;
    const activeUserData = JSON.parse(localStorage.getItem('activeUserData'));

    const requestBody = {
      userId: activeUserData.id,
      channelId: formData.configure.channel.value,
      hashtags: formData.configure.Hashtag.value // Ensure hashtag is included
    };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    };

    const response = await fetch(url, options);
    const data = await response.json();

    console.log('Slack channel latest message with hashtag:', data);

    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: data?.messages || data, // Store the fetched message
          error: !data.success ? data.message : null
        }
      }
    }));
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: data?.messages || data,
                error: !data.success ? data.message : null
              }
            }
          }
        }
      }) : node)
    })
  } catch (err) {
    console.error('Error fetching Slack messages:', err);
    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: { data: [{ error: 'Failed to fetch messages' }] }
      }
    }));

    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.Data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: { data: [{ error: 'Failed to fetch messages' }] }
            }
          }
        }
      }) : node)
    })
  }

  setIsTesting(false);
};

// ================================================================ TRELLO TEST CALL FUNCTIONS =======================================================
const testDueCards = async (formData, setFormData, setIsTesting, setNodes, nodeData) => {
  setIsTesting(true);
  try {
    const url = `${apiUrl}/api/trello/connections/get/due-cards`
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        BOARD_ID: formData.configure.Board.value,
        TIME: formData.configure['Time Before'].value,
        TIME_UNIT: formData.configure['Time Before(Unit)'].value,
        status: formData.configure.Status.value,
        isMember: formData.configure["Only cards where you're a member?"].value,
        userId: JSON.parse(localStorage.getItem('activeUserData')).id
      })
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log('trello board due cards: ', data)
    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: data.data || data
        }
      }
    }))
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: data.data || data
              }
            }
          }
        }
      }) : node)
    })
  } catch (err) {
    console.log(err)
  }
  setIsTesting(false)
}
const testMovedCards = async (formData, setFormData, setIsTesting, setNodes, nodeData) => {
  setIsTesting(true);
  try {
    const url = `${apiUrl}/api/trello/connections/check/card-movements`
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        CARD_ID: formData.configure.Card.value,
        userId: JSON.parse(localStorage.getItem('activeUserData')).id
      })
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log('trello board due cards: ', data)
    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: data.data || data
        }
      }
    }))
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: data.data || data
              }
            }
          }
        }
      }) : node)
    })
  } catch (err) {
    console.log(err)
  }
  setIsTesting(false)
}
const testUpdatedCards = async (formData, setFormData, setIsTesting, setNodes, nodeData) => {
  setIsTesting(true);
  try {
    const url = `${apiUrl}/api/trello/connections/check/updated-cards`
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        CARD_ID: formData.configure.Card.value,
        BOARD_ID: formData.configure.Board.value,
        userId: JSON.parse(localStorage.getItem('activeUserData')).id
      })
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log('trello board due cards: ', data)
    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: data.data || data
        }
      }
    }))
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: data.data || data
              }
            }
          }
        }
      }) : node)
    })
  } catch (err) {
    console.log(err)
  }
  setIsTesting(false)
}
const testTrelloActivity = async (formData, setFormData, setIsTesting, setNodes, nodeData) => {
  setIsTesting(true);
  try {
    const url = `${apiUrl}/api/trello/connections/check/activity`
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        CARD_ID: formData.configure.Card.value,
        BOARD_ID: formData.configure.Board.value,
        LIST_ID: formData.configure.List.value,
        activity: formData.configure.Activity.value,
        userId: JSON.parse(localStorage.getItem('activeUserData')).id
      })
    }
    const response = await fetch(url, options)
    const data = await response.json()
    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: data.data || data
        }
      }
    }))
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: data.data || data
              }
            }
          }
        }
      }) : node)
    })
  } catch (err) {
    console.log(err)
  }
  setIsTesting(false)
}
const testFindingUser = async (formData, setFormData, setIsTesting, setNodes, nodeData) => {
  setIsTesting(true);
  try {
    const url = `${apiUrl}/api/trello/connections/find/user`
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        organizationId: formData.configure.Organization.value,
        memberName: formData.configure["Memeber Name"].value,
        ifNoResults: formData.configure['If no search results are found?'].value,
        userId: JSON.parse(localStorage.getItem('activeUserData')).id
      })
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log('finding user in trello: ', data);

    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: data.data || data
        }
      }
    }))
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: data.data || data
              }
            }
          }
        }
      }) : node)
    })
  } catch (err) {
    console.log(err)
  }
  setIsTesting(false)
}
const testAddCardAttachment = async (formData, setFormData, setIsTesting, setNodes, nodeData) => {
  setIsTesting(true);
  try {
    const url = `${apiUrl}/api/trello/connections/add/card/attachment`
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cardId: formData.configure.Card.value,
        boardId: formData.configure.Board.value,
        listId: formData.configure.List.value,
        fileAttachment: formData.configure['File Attachments'].value,
        urlAttachment: formData.configure['URL Attachments'].value,
        userId: JSON.parse(localStorage.getItem('activeUserData')).id
      })
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log('attachment added to trelloo card: ', data);
    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: data.data || data
        }
      }
    }))
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: data.data || data
              }
            }
          }
        }
      }) : node)
    })
  } catch (err) {
    console.error('error adding attachement to card.', err);
  }
  setIsTesting(false)
}
const testAddBoardMember = async (formData, setFormData, setIsTesting, setNodes, nodeData) => {
  setIsTesting(true);
  try {
    const url = `${apiUrl}/api/trello/connections/add/board/member`
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        boardId: formData.configure.Board.value,
        memberId: formData.configure.Member.value,
        membershipType: formData.configure['Membership Type'].value,
        urlAttachment: formData.configure["Allow Billable Guest"].value,
        userId: JSON.parse(localStorage.getItem('activeUserData')).id
      })
    }
    const response = await fetch(url, options)
    const data = await response.json()
    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: data.data || data
        }
      }
    }))
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: data.data || data
              }
            }
          }
        }
      }) : node)
    })
  } catch (err) {
    console.error('error adding Member to trello board.', err);
  }
  setIsTesting(false)
}
const testAddCardMember = async (formData, setFormData, setIsTesting, setNodes, nodeData) => {
  setIsTesting(true);
  try {
    const url = `${apiUrl}/api/trello/connections/add/card/member`
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        boardId: formData.configure.Board.value,
        memberIds: formData.configure["Member(s)"].value,
        listId: formData.configure.List.value,
        cardId: formData.configure.Card.value,
        userId: JSON.parse(localStorage.getItem('activeUserData')).id
      })
    }
    const response = await fetch(url, options)
    const data = await response.json()
    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: data.data || data
        }
      }
    }))
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: data.data || data
              }
            }
          }
        }
      }) : node)
    })
  } catch (err) {
    console.error('error adding member(s) to trello card.', err);
  }
  setIsTesting(false)
}
const testCloseBoard = async (formData, setFormData, setIsTesting, setNodes, nodeData) => {
  setIsTesting(true);
  try {
    const url = `${apiUrl}/api/trello/connections/close/board`
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        boardId: formData.configure.Board.value,
        userId: JSON.parse(localStorage.getItem('activeUserData')).id
      })
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log('trello board closed: ', data)
    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: data?.data || data
        }
      }
    }))
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: data.data || data
              }
            }
          }
        }
      }) : node)
    })
  } catch (err) {
    console.error('error closing trello board.', err);
  }
  setIsTesting(false)
}
const testCreateTrelloBoard = async (formData, setFormData, setIsTesting, setNodes, nodeData) => {
  setIsTesting(true);
  try {
    const url = `${apiUrl}/api/trello/connections/create/board`
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        organization_id: formData.configure.Organization.value,
        name: formData.configure.Name.value,
        description: formData.configure.Description.value,
        permission_level: formData.configure['Permission Level'].value,
        allow_team_members: formData.configure['Allow Any Team Member to Join This Board?'].value,
        userId: JSON.parse(localStorage.getItem('activeUserData')).id
      })
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log('trello board closed: ', data)
    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: data?.data || data
        }
      }
    }))
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: data.data || data
              }
            }
          }
        }
      }) : node)
    })
  } catch (err) {
    console.error('error closing trello board.', err);
  }
  setIsTesting(false)
}
const testCreateTrelloCard = async (formData, setFormData, setIsTesting, setNodes, nodeData) => {
  setIsTesting(true);
  try {
    const url = `${apiUrl}/api/trello/connections/create/card`
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Board: formData.configure.Board.value,
        List: formData.configure.List.value,
        Name: formData.configure.Name.value,
        Description: formData.configure.Description.value,
        Label: formData.configure.Label.value,
        CustomLabel: formData.configure['Custom Label'].value,
        CardPosition: formData.configure['Card Position'].value,
        Member: formData.configure.Member.value,
        StartDate: formData.configure['Start Date'].value,
        DueDate: formData.configure['Due Date'].value,
        FileAttachments: formData.configure['File Attachments'].value,
        URLAttachments: formData.configure['URL Attachments'].value,
        ChecklistName: formData.configure['Checklist Name'].value,
        ChecklistItems: formData.configure['Checklist Items'].value,
        CardColor: formData.configure['Card Color'].value,
        Brghtness: formData.configure['Brightness'].value,
        URL: formData.configure['URL'].value,
        Size: formData.configure['Size'].value,
        Coordinates: formData.configure['Coordinates'].value,
        Address: formData.configure['Address'].value,
        Location: formData.configure['Location'].value,
        userId: JSON.parse(localStorage.getItem('activeUserData')).id
      })
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log('trello board closed: ', data)
    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: data?.data || data
        }
      }
    }))
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: data.data || data
              }
            }
          }
        }
      }) : node)
    })
  } catch (err) {
    console.error('error closing trello board.', err);
  }
  setIsTesting(false)
}
const testAddCommentToCard = async (formData, setFormData, setIsTesting, setNodes, nodeData) => {
  setIsTesting(true);
  try {
    const url = `${apiUrl}/api/trello/connections/add/card/comment`
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        boardId: formData.configure.Board.value,
        listId: formData.configure.List.value,
        cardId: formData.configure.Card.value,
        commentText: formData.configure['Comment Text'].value,
        userId: JSON.parse(localStorage.getItem('activeUserData')).id
      })
    }
    const response = await fetch(url, options)
    const data = await response.json()
    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: data?.data || data
        }
      }
    }))
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: data.data || data
              }
            }
          }
        }
      }) : node)
    })
  } catch (err) {
    console.error('error adding comment to trello card.', err);
  }
  setIsTesting(false)
}
const testCreateListInBoard = async (formData, setFormData, setIsTesting, setNodes, nodeData) => {
  setIsTesting(true);
  try {
    const url = `${apiUrl}/api/trello/connections/create/list`
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        boardId: formData.configure.Board.value,
        name: formData.configure['Name'].value,
        userId: JSON.parse(localStorage.getItem('activeUserData')).id
      })
    }
    const response = await fetch(url, options)
    const data = await response.json()
    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: data?.data || data
        }
      }
    }))
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: data.data || data
              }
            }
          }
        }
      }) : node)
    })
  } catch (err) {
    console.error('error creating list in trello board.', err);
  }
  setIsTesting(false)
}
const testMoveCard = async (formData, setFormData, setIsTesting, setNodes, nodeData) => {
  setIsTesting(true);
  try {
    const url = `${apiUrl}/api/trello/connections/move/card`
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        boardId: formData.configure.Board.value,
        fromListId: formData.configure['From List'].value,
        cardId: formData.configure.Card.value,
        toBoardId: formData.configure['To Board'].value,
        toListId: formData.configure['To List'].value,
        userId: JSON.parse(localStorage.getItem('activeUserData')).id
      })
    }
    const response = await fetch(url, options)
    const data = await response.json()
    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: data?.data || data
        }
      }
    }))
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: data.data || data
              }
            }
          }
        }
      }) : node)
    })
  } catch (err) {
    console.error('error moving card to list in trello.', err);
  }
  setIsTesting(false)
}
const testUpdateTrelloCard = async (formData, setFormData, setIsTesting, setNodes, nodeData) => {
  setIsTesting(true);
  try {
    const url = `${apiUrl}/api/trello/connections/update/card`
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Board: formData.configure.Board.value,
        List: formData.configure.List.value,
        Card: formData.configure.Card.value,
        cardName: formData.configure['Card Name'].value,
        cardDescription: formData.configure['Card Description'].value,
        overwriteDescription: formData.configure['Overwrite Description'].value,
        cardStartDate: formData.configure['Card Start Date'].value,
        cardDueDate: formData.configure['Card Due Date'].value,
        dueComplete: formData.configure['Due Complete'].value,
        cardColor: formData.configure['Card Color'].value,
        Brghtness: formData.configure['Brightness'].value,
        attachmentId: formData.configure['Attachment ID'].value,
        URL: formData.configure['URL'].value,
        Size: formData.configure['Size'].value,
        Coordinates: formData.configure['Coordinates'].value,
        Address: formData.configure['Address'].value,
        Location: formData.configure['Location'].value,
        userId: JSON.parse(localStorage.getItem('activeUserData')).id
      })
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log('trello board updated: ', data)
    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: data?.data || data
        }
      }
    }))
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: data.data || data
              }
            }
          }
        }
      }) : node)
    })
  } catch (err) {
    console.error('error updating trello card.', err);
  }
  setIsTesting(false)
}


// ============================================ test SOAP api integrations =========================================
const testSoapIntegrationAPI = async (formData, setFormData, setIsTesting, setNodes, nodeData) => {
  setIsTesting(true);

  const body = {
    wsdlUrl: 'http://localhost:3001/wsdl?wsdl',
    body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                                xmlns:user="http://example.com/user">
                    <soapenv:Header/>
                    <soapenv:Body>
                        <user:getUserRequest>
                            <user:id>1</user:id>
                        </user:getUserRequest>
                    </soapenv:Body>
                </soapenv:Envelope>`,
    endPoints: ['/'],
    headers: {},
    methodName: formData.configure.Method.value || 'getUser'
  }
  try {
    const URL = `${apiUrl}/api/connections/soap/test/handle-soap-operation`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }

    const response = await fetch(URL, options)
    const data = await response.json();
    console.log('SoapAPItestResponse: ', data)
    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: data?.data || data
        }
      }
    }))
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: data.data || data
              }
            }
          }
        }
      }) : node)
    })
  } catch (err) {
    console.error('error updating trello card.', err);
  }
  setIsTesting(false)
}
const testSoapAPIUserCreation = async (formData, setFormData, setIsTesting, setNodes, nodeData) => {
  setIsTesting(true);
  console.log("formData: ", formData.configure.name.value, formData.configure.email.value);

  const body = {
    wsdlUrl: 'http://localhost:3001/wsdl?wsdl',
    body: {
      "name": formData.configure.name.value,
      "email": formData.configure.email.value
    },
    endPoints: ['/'],
    headers: {},
    methodName: 'createUser'
  }
  try {
    const URL = `${apiUrl}/api/connections/soap/test/handle-soap-operation`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...body,
      })
    }

    const response = await fetch(URL, options)
    const data = await response.json();
    console.log('SoapAPItestResponse: ', data)
    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: data?.data || data
        }
      }
    }))
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: data.data || data
              }
            }
          }
        }
      }) : node)
    })
  } catch (err) {
    console.error('error updating trello card.', err);
  }
  setIsTesting(false)
}

//============================================== test webhhook functions ==============================================
const testCatchWebhook = async (formData, setFormData, setIsTesting, setNodes, nodeData) => {
  setIsTesting(true);
  try {
    const webhookId = formData.configure['Webhook Url'].value;
    let webhookUrl = formData.configure['Outside Webhook'].value;

    let webhookDetails;

    if (webhookId !== '') {
      const result = await fetch(`${apiUrl}/api/webhooks/${webhookId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      });
      const data = await result.json()
      console.log('webhook details: ', data)
      webhookDetails = data;
    }
    // console.log('webhook details: ',
    const method = formData.configure.Method.value || 'POST'
    const patheExtension = formData.configure['Path Extension'].value
    const params = formData.configure['Params'].value
    // const childkey = formData.configure['Pick off a Child Key'].value
    // )
    let url = `${webhookDetails?.webhook_url}`
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }
    const customOptions = {
      method: method
    }
    //http://localhost:3001/api/webhooks/test/any-webhook?api_key=key_9d7af27463cba3c0f93f580150e91d9b&api_token=sec_8ccb1a511e4338bf21d09f9300c8dab26a146ec492f484cccbab9f249a80bfc0
    if (patheExtension !== '') {
      webhookUrl = webhookUrl.split('?')[0] + patheExtension + '?' + webhookUrl.split('?')[1]
      url = url?.split('?')?.[0] + patheExtension + '?' + url?.split('?')?.[1]
    }

    if (params) {
      const paramsString = params.map(item => `&${item.key}=${item.value}`).join('')
      webhookUrl.split('?').length > 1 ?
        webhookUrl = webhookUrl + paramsString
        : webhookUrl + '?' + paramsString
    }

    const response =
      webhookUrl === "" || webhookId !== ''
        ? await fetch(url, options)
        : await fetch(webhookUrl, customOptions);
    const data = await response.json()
    // console.log("webhook response data: ", data);

    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: data?.data || data
        }
      }
    }))
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: data.data || data
              }
            }
          }
        }
      }) : node)
    })
  } catch (err) {
    console.error('error catching the webhook response.', err);
  }
  setIsTesting(false)
}
const testCustomRequest = async (formData, setFormData, setIsTesting, setNodes, nodeData) => {
  setIsTesting(true);
  try {
    const webhookId = formData.configure['Webhook Url'].value;
    let webhookUrl = formData.configure['Outside Webhook'].value;

    let webhookDetails;

    if (webhookId !== '') {
      const result = await fetch(`${apiUrl}/api/webhooks/${webhookId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      });
      const data = await result.json()
      console.log('webhook details: ', data)
      webhookDetails = data;
    }
    // console.log('webhook details: ',
    const method = formData.configure.Method.value || 'POST'
    const patheExtension = formData.configure['Path Extension'].value
    const params = formData.configure['Params'].value
    // const childkey = formData.configure['Pick off a Child Key'].value
    // )
    let url = `${webhookDetails?.webhook_url}`
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }
    const customOptions = {
      method: method
    }
    //http://localhost:3001/api/webhooks/test/any-webhook?api_key=key_9d7af27463cba3c0f93f580150e91d9b&api_token=sec_8ccb1a511e4338bf21d09f9300c8dab26a146ec492f484cccbab9f249a80bfc0
    if (patheExtension !== '') {
      webhookUrl = webhookUrl.split('?')[0] + patheExtension + '?' + webhookUrl.split('?')[1]
      url = url?.split('?')?.[0] + patheExtension + '?' + url?.split('?')?.[1]
    }

    if (params) {
      const paramsString = params.map(item => `&${item.key}=${item.value}`).join('')
      webhookUrl.split('?').length > 1 ?
        webhookUrl = webhookUrl + paramsString
        : webhookUrl + '?' + paramsString
    }
    console.log('calling...: ', webhookUrl === "", webhookId !== '');

    const response =
      webhookUrl === "" || webhookId !== ''
        ? await fetch(url, options)
        : await fetch(webhookUrl, customOptions);
    const data = await response.json()
    // console.log("webhook response data: ", data);

    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: data?.data || data
        }
      }
    }))
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: data.data || data
              }
            }
          }
        }
      }) : node)
    })
  } catch (err) {
    console.error('error catching the webhook response.', err);
  }
  setIsTesting(false)
}
const testCustomActionRequest = async (formData, setFormData, setIsTesting, setNodes, nodeData) => {
  setIsTesting(true);
  try {
    const webhookId = formData.configure['Webhook Url'].value;
    let webhookUrl = formData.configure['Url'].value;

    let webhookDetails;

    if (webhookId !== '') {
      const result = await fetch(`${apiUrl}/api/webhooks/${webhookId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      });
      const data = await result.json()
      console.log('webhook details: ', data)
      webhookDetails = data;
    }
    const method = formData.configure.Method.value || 'POST'
    const resdata = formData.configure['Data'].value
    const basicAuth = formData.configure['Basic Auth'].value
    const returnRawResponse = formData.configure['Return Raw Response'].value
    const url = `${webhookDetails?.webhook_url}`
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }
    const customOptions = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${Cookies.get('accessToken')}`
      },
      body: JSON.stringify({
        resdata,
        basicAuth,
        returnRawResponse
      })
    }

    const response =
      webhookUrl === ""
        ? await fetch(url, options)
        : await fetch(webhookUrl, customOptions);
    const data = await response.json()
    // console.log("webhook response data: ", data);

    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: data?.data || data
        }
      }
    }))
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: data.data || data
              }
            }
          }
        }
      }) : node)
    })
  } catch (err) {
    console.error('error catching the webhook response.', err);
  }
  setIsTesting(false)
}
const testGETActionRequest = async (formData, setFormData, setIsTesting, setNodes, nodeData) => {
  setIsTesting(true);
  try {
    const webhookId = formData.configure['Webhook Url'].value;
    let webhookUrl = formData.configure['Url'].value;
    const method = formData.configure['Method'].value || 'GET';
    const queryParams = formData.configure['Query Params'].value || [];
    const sendAsJson = formData.configure['Send As JSON'].value;
    const jsonKey = formData.configure['JSON Key'].value;
    const basicAuth = formData.configure['Basic Auth'].value;
    const headersArr = formData.configure['Headers'].value || [];

    let webhookDetails;

    // Fetch webhook details if webhookId is provided
    if (webhookId !== '') {
      const result = await fetch(`${apiUrl}/api/webhooks/${webhookId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      });
      const data = await result.json();
      webhookDetails = data;
    }

    // Use webhook_url from details if no direct url provided
    const url = webhookUrl || webhookDetails?.webhook_url || '';

    // Build query params string
    let finalUrl = url;
    if (Array.isArray(queryParams) && queryParams.length > 0) {
      const paramsString = queryParams
        .map(item => `${encodeURIComponent(item.key)}=${encodeURIComponent(item.value)}`)
        .join('&');
      finalUrl += (finalUrl.includes('?') ? '&' : '?') + paramsString;
    }

    // Build headers
    let headers = {
      'Content-Type': sendAsJson ? 'application/json' : 'application/x-www-form-urlencoded',
      authorization: `Bearer ${Cookies.get('accessToken')}`
    };
    if (basicAuth) {
      headers['Authorization'] = `Basic ${basicAuth}`;
    }
    if (Array.isArray(headersArr) && headersArr.length > 0) {
      headersArr.forEach(item => {
        if (item.key && item.value) headers[item.key] = item.value;
      });
    }

    // Build fetch options
    let options = {
      method,
      headers
    };

    // For GET, do not send body
    if (method !== 'GET') {
      let bodyData = {};
      if (sendAsJson) {
        if (jsonKey) {
          bodyData[jsonKey] = formData.configure['Data']?.value || {};
        } else {
          bodyData = formData.configure['Data']?.value || {};
        }
        options.body = JSON.stringify(bodyData);
      } else {
        // x-www-form-urlencoded
        const formBody = [];
        const dataObj = formData.configure['Data']?.value || {};
        for (let key in dataObj) {
          formBody.push(`${encodeURIComponent(key)}=${encodeURIComponent(dataObj[key])}`);
        }
        options.body = formBody.join('&');
      }
    }

    const response = await fetch(finalUrl, options);
    const data = await response.json();

    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: data?.data || data
        }
      }
    }));
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: data.data || data
              }
            }
          }
        }
      }) : node)
    });
  } catch (err) {
    console.error('error catching the webhook response.', err);
    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: [{ error: 'Failed to fetch response' }]
        }
      }
    }));
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: [{ error: 'Failed to fetch response' }]
              }
            }
          }
        }
      }) : node)
    });
  }
  setIsTesting(false);
}
const testPOSTActionRequest = async (formData, setFormData, setIsTesting, setNodes, nodeData) => {
  setIsTesting(true);
  try {
    const webhookId = formData.configure['Webhook Url'].value;
    let webhookUrl = formData.configure['Url'].value;
    const method = formData.configure['Method'].value || 'POST';
    const payloadType = formData.configure['Payload Type'].value || 'json';
    let dataPayload = formData.configure['Data'].value || {};
    const wrapInArray = formData.configure['Wrap Request In Array'].value;
    const basicAuth = formData.configure['Basic Auth'].value;
    const headersArr = formData.configure['Headers'].value || [];

    let webhookDetails;

    if (webhookId !== '') {
      const result = await fetch(`${apiUrl}/api/webhooks/${webhookId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      });
      const data = await result.json();
      webhookDetails = data;
    }

    const url = webhookUrl || webhookDetails?.webhook_url || '';

    // Build headers
    let headers = {
      authorization: `Bearer ${Cookies.get('accessToken')}`
    };
    if (basicAuth) {
      headers['Authorization'] = `Basic ${basicAuth}`;
    }
    if (Array.isArray(headersArr) && headersArr.length > 0) {
      headersArr.forEach(item => {
        if (item.key && item.value) headers[item.key] = item.value;
      });
    }

    // Set content-type header and body
    let body;
    if (wrapInArray) {
      dataPayload = [dataPayload];
    }
    switch (payloadType) {
      case 'json':
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(dataPayload);
        break;
      case 'form':
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        body = Object.entries(dataPayload)
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join('&');
        break;
      case 'xml':
        headers['Content-Type'] = 'application/xml';
        body = typeof dataPayload === 'string' ? dataPayload : '';
        break;
      case 'raw':
        headers['Content-Type'] = 'text/plain';
        body = typeof dataPayload === 'string' ? dataPayload : '';
        break;
      default:
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(dataPayload);
    }

    const options = {
      method,
      headers,
      body
    };

    const response = await fetch(url, options);
    const data = await response.json();

    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: data?.data || data
        }
      }
    }));
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: data.data || data
              }
            }
          }
        }
      }) : node)
    });
  } catch (err) {
    console.error('error catching the webhook response.', err);
    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: [{ error: 'Failed to fetch response' }]
        }
      }
    }));
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: [{ error: 'Failed to fetch response' }]
              }
            }
          }
        }
      }) : node)
    });
  }
  setIsTesting(false);
}
const testPUTActionRequest = async (formData, setFormData, setIsTesting, setNodes, nodeData) => {
  setIsTesting(true);
  try {
    const webhookId = formData.configure['Webhook Url'].value;
    let webhookUrl = formData.configure['Url'].value;
    const method = formData.configure['Method'].value || 'PUT';
    const payloadType = formData.configure['Payload Type'].value || 'json';
    let dataPayload = formData.configure['Data'].value || {};
    const wrapInArray = formData.configure['Wrap Request In Array'].value;
    const basicAuth = formData.configure['Basic Auth'].value;
    const headersArr = formData.configure['Headers'].value || [];

    let webhookDetails;

    if (webhookId !== '') {
      const result = await fetch(`${apiUrl}/api/webhooks/${webhookId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      });
      const data = await result.json();
      webhookDetails = data;
    }

    const url = webhookUrl || webhookDetails?.webhook_url || '';

    // Build headers
    let headers = {
      authorization: `Bearer ${Cookies.get('accessToken')}`
    };
    if (basicAuth) {
      headers['Authorization'] = `Basic ${basicAuth}`;
    }
    if (Array.isArray(headersArr) && headersArr.length > 0) {
      headersArr.forEach(item => {
        if (item.key && item.value) headers[item.key] = item.value;
      });
    }

    // Set content-type header and body
    let body;
    if (wrapInArray) {
      dataPayload = [dataPayload];
    }
    switch (payloadType) {
      case 'json':
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(dataPayload);
        break;
      case 'form':
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        body = Object.entries(dataPayload)
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join('&');
        break;
      case 'xml':
        headers['Content-Type'] = 'application/xml';
        body = typeof dataPayload === 'string' ? dataPayload : '';
        break;
      case 'raw':
        headers['Content-Type'] = 'text/plain';
        body = typeof dataPayload === 'string' ? dataPayload : '';
        break;
      default:
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(dataPayload);
    }

    const options = {
      method,
      headers,
      body
    };

    const response = await fetch(url, options);
    const data = await response.json();

    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: data?.data || data
        }
      }
    }));
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: data.data || data
              }
            }
          }
        }
      }) : node)
    });
  } catch (err) {
    console.error('error catching the webhook response.', err);
    setFormData(prev => ({
      ...prev,
      test: {
        ...prev.test,
        testResult: {
          data: [{ error: 'Failed to fetch response' }]
        }
      }
    }));
    setNodes(prev => {
      return prev.map(node => node.id === nodeData.id ? ({
        ...node,
        data: {
          ...node.data,
          formData: {
            ...formData,
            test: {
              ...formData.test,
              testResult: {
                data: [{ error: 'Failed to fetch response' }]
              }
            }
          }
        }
      }) : node)
    });
  }
  setIsTesting(false);
}


export const callTestFunction = async (name, formData, setFormData, setIsTesting, setNodes, nodeData) => {
  switch (name) {
    case 'testSlackQueryMatchedMessages':
      return testSlackQueryMatchedMessages(formData, setFormData, setIsTesting, setNodes, nodeData)
    case 'testSlackLatestMessages':
      return testSlackLatestMessages(formData, setFormData, setIsTesting, setNodes, nodeData)
    case 'testSlackNewFiles':
      return testSlackNewFiles(formData, setFormData, setIsTesting, setNodes, nodeData)
    case 'testMentions':
      return testMentions(formData, setFormData, setIsTesting, setNodes, nodeData)
    case 'testRecentChannels':
      return testRecentChannels(formData, setFormData, setIsTesting, setNodes, nodeData)
    case 'testRecentMessagesInprivateChannel':
      return testRecentMessagesInprivateChannel(formData, setFormData, setIsTesting, setNodes, nodeData)
    case 'testSendDirectMessages':
      return testSendDirectMessages(formData, setFormData, setIsTesting, setNodes, nodeData)
    case 'fetchLatestMessageWithHashtag':
      return fetchLatestMessageWithHashtag(formData, setFormData, setIsTesting, setNodes, nodeData)

    // testing trello functions
    case 'testDueCards':
      return testDueCards(formData, setFormData, setIsTesting, setNodes, nodeData);
    case 'testMovedCards':
      return testMovedCards(formData, setFormData, setIsTesting, setNodes, nodeData);
    case 'testUpdatedCards':
      return testUpdatedCards(formData, setFormData, setIsTesting, setNodes, nodeData);
    case 'testTrelloActivity':
      return testTrelloActivity(formData, setFormData, setIsTesting, setNodes, nodeData);
    case 'testFindingUser':
      return testFindingUser(formData, setFormData, setIsTesting, setNodes, nodeData);
    case 'testAddCardAttachment':
      return testAddCardAttachment(formData, setFormData, setIsTesting, setNodes, nodeData);
    case 'testAddBoardMember':
      return testAddBoardMember(formData, setFormData, setIsTesting, setNodes, nodeData);
    case 'testAddCardMember':
      return testAddCardMember(formData, setFormData, setIsTesting, setNodes, nodeData);
    case 'testCloseBoard':
      return testCloseBoard(formData, setFormData, setIsTesting, setNodes, nodeData);
    case 'testCreateTrelloBoard':
      return testCreateTrelloBoard(formData, setFormData, setIsTesting, setNodes, nodeData);
    case 'testCreateTrelloCard':
      return testCreateTrelloCard(formData, setFormData, setIsTesting, setNodes, nodeData);
    case 'testAddCommentToCard':
      return testAddCommentToCard(formData, setFormData, setIsTesting, setNodes, nodeData);
    case 'testCreateListInBoard':
      return testCreateListInBoard(formData, setFormData, setIsTesting, setNodes, nodeData);
    case 'testMoveCard':
      return testMoveCard(formData, setFormData, setIsTesting, setNodes, nodeData);
    case 'testUpdateTrelloCard':
      return testUpdateTrelloCard(formData, setFormData, setIsTesting, setNodes, nodeData);

    // testing soap apis
    case 'testSoapIntegrationAPI':
      return testSoapIntegrationAPI(formData, setFormData, setIsTesting, setNodes, nodeData);
    case 'testSoapAPIUserCreation':
      return testSoapAPIUserCreation(formData, setFormData, setIsTesting, setNodes, nodeData);

    // webhook test calls
    case 'testCatchWebhook':
      return testCatchWebhook(formData, setFormData, setIsTesting, setNodes, nodeData);
    case 'testCustomRequest':
      return testCustomRequest(formData, setFormData, setIsTesting, setNodes, nodeData);
    case 'testCustomActionRequest':
      return testCustomActionRequest(formData, setFormData, setIsTesting, setNodes, nodeData);
    case 'testGETActionRequest':
      return testGETActionRequest(formData, setFormData, setIsTesting, setNodes, nodeData);
    case 'testPOSTActionRequest':
      return testPOSTActionRequest(formData, setFormData, setIsTesting, setNodes, nodeData);
    case 'testPUTActionRequest':
      return testPUTActionRequest(formData, setFormData, setIsTesting, setNodes, nodeData);

    default:
      return null
  }
}