import React from 'react'
import { useSelector } from 'react-redux'

function Stories() {
  const { user } = useSelector((state) => state.user)

  const users = [
    { userAvatar: 'https://st.depositphotos.com/46542440/55685/i/450/depositphotos_556850692-stock-illustration-square-face-character-stiff-art.jpg' },
    { userAvatar: 'https://st.depositphotos.com/46542440/55685/i/450/depositphotos_556850692-stock-illustration-square-face-character-stiff-art.jpg' },
    { userAvatar: 'https://st.depositphotos.com/46542440/55685/i/450/depositphotos_556850692-stock-illustration-square-face-character-stiff-art.jpg' },
    { userAvatar: 'https://st.depositphotos.com/46542440/55685/i/450/depositphotos_556850692-stock-illustration-square-face-character-stiff-art.jpg' },
    { userAvatar: 'https://st.depositphotos.com/46542440/55685/i/450/depositphotos_556850692-stock-illustration-square-face-character-stiff-art.jpg' },
    { userAvatar: 'https://st.depositphotos.com/46542440/55685/i/450/depositphotos_556850692-stock-illustration-square-face-character-stiff-art.jpg' },
    { userAvatar: 'https://st.depositphotos.com/46542440/55685/i/450/depositphotos_556850692-stock-illustration-square-face-character-stiff-art.jpg' },
    { userAvatar: 'https://st.depositphotos.com/46542440/55685/i/450/depositphotos_556850692-stock-illustration-square-face-character-stiff-art.jpg' },
    { userAvatar: 'https://st.depositphotos.com/46542440/55685/i/450/depositphotos_556850692-stock-illustration-square-face-character-stiff-art.jpg' },
    { userAvatar: 'https://st.depositphotos.com/46542440/55685/i/450/depositphotos_556850692-stock-illustration-square-face-character-stiff-art.jpg' },
    { userAvatar: 'https://st.depositphotos.com/46542440/55685/i/450/depositphotos_556850692-stock-illustration-square-face-character-stiff-art.jpg' },
    { userAvatar: 'https://st.depositphotos.com/46542440/55685/i/450/depositphotos_556850692-stock-illustration-square-face-character-stiff-art.jpg' },
  ]
  
  return (
    <div className="w-full py-4 px-2 inline-block mr-2">
      <div className="ml-2 mb-2 font-medium">Stories</div>
      <div className="flex h-[100px] sm:h-[120px] md:h-[140px]">
        {/* Fixed left section */}
        <div className="flex flex-col items-center justify-center px-3 shrink-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-blue-500">
            <img
              src={user?.avatar?.url}
              alt="Your story"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs mt-1">You</span>
        </div>

        {/* Vertical Line */}
        <div className="w-[2px] h-[80%] my-auto bg-slate-400 mx-3" />

        {/* Scrollable user stories */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {users.map((element, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-gray-400 hover:border-blue-400 cursor-pointer">
              <img
                src={element.userAvatar}
                alt={"Story"}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs mt-1">{element?.name ?? "User " + (index + 1) }</span>
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default Stories
