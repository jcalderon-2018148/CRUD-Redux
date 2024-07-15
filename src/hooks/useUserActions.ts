import { UserId, addNewUser, deleteUserById } from "../store/users/slice";
import { useAppDispath } from "./store";

export const useUserActions = () => {
	const dispatch = useAppDispath();

	const removeUser = (id: UserId) => {
		dispatch(deleteUserById(id));
	};

	const addUser = ({ name, email, github }) => {
		dispatch(addNewUser({ name, email, github }));
	};

	return { addUser, removeUser };
};
