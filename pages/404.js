import { useRouter } from "next/router"

export default function NotFound() {
	const route = useRouter();
	setTimeout(() => {
		route.push("/");
	},3000)
	return (
		<>
			<p>Paage Not found</p>
		</>
	)
}
