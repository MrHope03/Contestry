import Image from "next/image";
import { useRouter } from "next/router";

export default function ContestCard({ contest }) {
    const router = useRouter();
    return (
        <div className="shadow-[0_0_10px_0_rgba(0,0,0,0.4)] p-2 ring-1 ring-gray-300 rounded-md m-2">
            <Image src={contest.image} width={350} height={350} />
            <p className="p-1 text-xl font-semibold text-black">
                {contest.contestName} from {contest.creator}
            </p>
            <button
                onClick={() => router.push(`/${contest.contestName}`)}
                className="p-1 px-10 mt-3 text-gray-100 bg-green-500 rounded-3xl hover:bg-green-600 hover:text-white"
            >
                Enter
            </button>
        </div>
    );
}
