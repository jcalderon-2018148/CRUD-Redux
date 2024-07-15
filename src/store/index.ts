import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";
import usersReducer, { rollbackUser } from "./users/slice";

// Every param is executed in different moments
const persistanceLocalStorageMiddleware = (store) => (next) => (action) => {
	next(action);
	localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
};

const syncWithDatabaseMiddleware: Middleware =
	(store) => (next) => (action) => {
		const { type, payload } = action;
		const previusState = store.getState();

		// We pass to the next action but we don't know if the fetch is going to be successful
		// Called optimistic update
		next(action);

		if (type === "users/deleteUserById") {
			const userIdToRemove = payload;
			const userToRemove = previusState.users.find(
				(user) => user.id === userIdToRemove,
			);

			fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
				method: "DELETE",
			})
				.then((res) => {
					if (res.ok) toast.success(`User ${payload} deleted correctly`);
				})
				.catch((err) => {
					toast.error(`User ${userIdToRemove} could not be deleted`);
					if (userToRemove) store.dispatch(rollbackUser(userToRemove));
					console.log(err);
					console.log("Error");
				});
		}
	};

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	middleware: [persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
