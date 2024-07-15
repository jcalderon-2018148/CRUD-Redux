import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useState } from "react";
import { useUserActions } from "../hooks/useUserActions";

export function CreateNewUser() {
	const { addUser } = useUserActions();
	const [result, setResult] = useState<"ok" | "ko" | null>(null);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const form = event.target as HTMLFormElement; // Cast event.target to HTMLFormElement
		const formData = new FormData(form);

		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const github = formData.get("github") as string;

		if (!name || !email || !github) {
			return setResult("ko");
		}

		addUser({ name, email, github });
		setResult('ok')
		form.reset();
	};

	return (
		<Card style={{ marginTop: "16px" }}>
			<Title>Create New User</Title>

			<form onSubmit={handleSubmit}>
				<TextInput placeholder="Name" name="name" className="mb-4" />
				<TextInput placeholder="Email" name="email" className="mb-4" />
				<TextInput placeholder="Github username" name="github" className="mb-1" />

				<div>
					<Button type="submit" style={{ marginTop: "16px" }} className="mr-2">
						Create user
					</Button>
					<span>
						{ result === 'ok' && <Badge color="green">User created!</Badge> }
						{ result === 'ko' && <Badge color="red">Please fill all fields</Badge> }
					</span>
				</div>
			</form>
		</Card>
	);
}
