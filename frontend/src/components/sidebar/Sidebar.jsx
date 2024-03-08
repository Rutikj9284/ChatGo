//Sidebar has 3 Components -> Serach Input , Conversation Wala Array (Which contains Ids of LoggedIn user See backend), logout button

// import Conversations from "./Conversations";
// import LogoutButton from "./LogoutButton";
import Conversation from "../../../../backend/models/conversationModel";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col'>
			<SearchInput />
			<div className='divider px-3'></div>
			<Conversations />
            <LogoutButton />
		</div>
	);
};
export default Sidebar;