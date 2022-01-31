import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzU4NjM1NiwiZXhwIjoxOTU5MTYyMzU2fQ.d_4VQjvoKoSgcmZzBbjRfPBihmIWVuNIyipHmdBUFoY'
const SUPABASE_URL = 'https://igolbfwrivbtbgoexkaw.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default function ChatPage() {
    // Sua lógica vai aqui
    const [mensagem, setMensagem] = React.useState('')
    const [listMsg, setListMsg] = React.useState([])
    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                setListMsg(data)
            })
    }, [])

    function handleNewMessage(newMessage, listMsg) {
        if (newMessage != '') {
            const msg = {
                // id: listMsg.length + 1,
                from: 'denilsonsobreira',
                text: newMessage
            }
            supabaseClient
                .from('mensagens')
                .insert([
                    msg
                ])
                .then(({ data }) => {
                    setListMsg([
                        data[0],
                        ...listMsg
                    ])
                })
            setMensagem('')
        }
    }
    function handleRemoveItem(idMsg) {
        setListMsg(listMsg.filter(item => item.id !== idMsg))
    }
    // ./Sua lógica vai aqui
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(${appConfig.theme.urlBackgroundImage})`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    {/* <MessageList mensagem={listMsg} /> */}
                    {/* {listMsg.map((objMessage) => {
                        return (
                            <li key={objMessage.id}>
                                {objMessage.from}: {objMessage.text}
                            </li>
                        )
                    })} */}
                    {/* inicio componente MessageList */}
                    <Box
                        tag="ul"
                        styleSheet={{
                            overflow: 'scroll',
                            display: 'flex',
                            flexDirection: 'column-reverse',
                            flex: 1,
                            color: appConfig.theme.colors.neutrals["000"],
                            marginBottom: '16px',
                        }}
                    >
                        {listMsg.map((mensagem) => {
                            return (
                                <Text
                                    key={mensagem.id}
                                    tag="li"
                                    styleSheet={{
                                        borderRadius: '5px',
                                        padding: '6px',
                                        marginBottom: '12px',
                                        hover: {
                                            backgroundColor: appConfig.theme.colors.neutrals[700],
                                        }
                                    }}
                                >
                                    <Box
                                        styleSheet={{
                                            display: 'flex',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        <Image
                                            styleSheet={{
                                                width: '20px',
                                                height: '20px',
                                                borderRadius: '50%',
                                                display: 'inline-block',
                                                marginRight: '8px',
                                            }}
                                            src={`https://github.com/${mensagem.from}.png`}
                                        />

                                        <Text tag="strong">
                                            {mensagem.from}
                                        </Text>
                                        <Text
                                            styleSheet={{
                                                fontSize: '10px',
                                                marginLeft: '8px',
                                                color: appConfig.theme.colors.neutrals[300],
                                            }}
                                            tag="span"
                                        >
                                            {(new Date().toLocaleDateString())}
                                        </Text>
                                        <Button
                                            onClick={(event) => {
                                                event.preventDefault()
                                                const idMsg = mensagem.id
                                                handleRemoveItem(idMsg)
                                            }}
                                            styleSheet={{
                                                justifySelf: 'end',
                                                width: '5px',
                                                height: '5px',
                                                position: 'absolute',
                                                right: '50px'
                                            }}
                                            type="submit"
                                            buttonColors={{
                                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                                mainColor: appConfig.theme.colors.neutrals[600],
                                                mainColorLight: appConfig.theme.colors.neutrals[400],
                                                mainColorStrong: appConfig.theme.colors.neutrals[900]
                                            }}
                                            iconName="trash"
                                            type="submit"
                                        />
                                    </Box>

                                    {mensagem.text}
                                </Text>
                            )
                        })}

                    </Box>

                    {/* Fim componente messageList */}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => { setMensagem(event.target.value) }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault()
                                    handleNewMessage(mensagem, listMsg)
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Button
                            onClick={(event) => {
                                event.preventDefault()
                                handleNewMessage(mensagem, listMsg)
                            }}
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[800]
                            }}
                            iconName="arrowRight"
                            type="submit"
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagem.map((mensagem) => {
                return (
                    <Text
                        tag="li"
                        key={mensagem.id}
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                display: 'flex',
                                // justifyContent: 'space-between',
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.from}.png`}
                            />

                            <Text tag="strong">
                                {mensagem.from}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                            <Button
                                onClick={(event) => {
                                    event.preventDefault()
                                    const idMsg = mensagem.id
                                    // props.mensagem.push({ id: 424, from: 'Denilson', text: 'aaaaaaaaaaaaaaa' })
                                    // MessageList(props)
                                }}
                                styleSheet={{
                                    justifySelf: 'end',
                                    width: '5px',
                                    height: '5px',
                                    position: 'absolute',
                                    right: '50px'
                                }}
                                type="submit"
                                buttonColors={{
                                    contrastColor: appConfig.theme.colors.neutrals["000"],
                                    mainColor: appConfig.theme.colors.neutrals[600],
                                    mainColorLight: appConfig.theme.colors.neutrals[400],
                                    mainColorStrong: appConfig.theme.colors.neutrals[900]
                                }}
                                iconName="trash"
                                type="submit"
                            />
                        </Box>

                        {mensagem.text}
                    </Text>
                )
            })}

        </Box>
    )
}