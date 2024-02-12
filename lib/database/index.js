import { ChatsDatabase } from './chats.js'
import { UsersDatabase } from './users.js'
import { SettingsDatabase } from './settings.js'
import path from 'path'

export * from './chats.js'
export * from './users.js'


const baseFolder = './database'
const usersFolder = path.join(baseFolder, './users')
const chatsFolder = path.join(baseFolder, './chats')
const settingsFolder = path.join(baseFolder, './settings')

const users = new UsersDatabase(usersFolder)
const chats = new ChatsDatabase(chatsFolder)
const settings = new SettingsDatabase(settingsFolder)

export default {
    users,
    chats,
    settings
} 