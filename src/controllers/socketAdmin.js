const Chat = require("../models/chatSchema")

const socketAdmin = (socket) => {

    console.log(`⚡: ${socket.id} user just connected!`)

    socket.on('testRecive', (data) => {
        console.log(data)
    })

    /** users = [userData._id, deli_id] */
    socket.on('find_chat', async (users) => {
        console.log('#socket-find_chat')
        try {
            const result = await Chat.findOne({
                participants: { $all: users }
            }).populate('participants')
            // console.log(result)
            if (result) {
                socket.join(result._id)
                socket.emit('found_chat', { chat: result, status: 200 })
            } else {
                const newChat = new Chat({ participants: users, delivery_id: users[1] })
                await newChat.save()
                let chatoSend = await newChat.populate('participants')
                socket.join(newChat._id)
                socket.emit('found_chat', { chat: chatoSend, status: 200, })
            }

        } catch (error) {
            console.log(error.message)
            socket.emit('found_chat', { status: 400 })
        }
    })

    socket.on('leave_chat', async (chat_id) => {
        console.log("#socket-leave_chat")
        socket.leave(chat_id)
    })

    socket.on('add_message', async ({ chat_id, new_message }) => {
        console.log('#socket-add_message')
        const result = await Chat.findOneAndUpdate({ _id: chat_id }, {
            $push: {
                messages: {
                    ...new_message
                }
            }
        }, { new: true })
        console.log(result)
        socket.broadcast.emit('update_messages', result)

    })

    socket.on('toggleTracking', async ({
        state, chat_id
    }) => {
        console.log('#toggleTracking')
        await Chat.findOneAndUpdate({ _id: chat_id }, { live_sharing: state })
        socket.broadcast.emit('update_tracking', state)
    })

    socket.on('delivery_pos',async(position)=>{
        socket.broadcast.emit('update_delivery_pos', position)
    })

    socket.on("disconnect", () => {
        socket.disconnect();
        console.log("🔥: A user disconnected");
    });

}

module.exports = socketAdmin