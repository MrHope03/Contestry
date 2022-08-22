import { useRouter } from "next/router";

export default function NotFound() {
    const router = useRouter();
    return (
        <div className="text-center text-gray-700">
            <p>Page Not found</p>
            <p onClick={() => router.push("/")}>Return to Home</p>
        </div>
    );
}
