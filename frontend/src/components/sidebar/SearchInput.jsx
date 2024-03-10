import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import userConversation from "../../zustand/userConversation";
import userConversationHook from "../../hooks/userConversation";
const SearchInput = () => {
	const [input, setInput] = useState("");
	const {setSelectedConversation} = userConversation();
	const {conversations} = userConversationHook();
	
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!input) return;
		if (input.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(input.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
			setInput("");
		} else toast.error("No such user found!");
	};
	return (
		<form onSubmit={handleSubmit} className='flex items-center gap-2'>
			<input type='text' value={input} onChange={(e)=> setInput(e.target.value)} placeholder='Search…' className='input input-bordered rounded-full' />
			<button type='submit' className='btn btn-circle bg-black text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;