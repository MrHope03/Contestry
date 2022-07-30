import Head from 'next/head';

const About = () => {
	return(
		<>
		<Head>
			<title>Contestry | About</title>
		</Head>
		<div className="m-5">
			<h1 className="text-5xl border-b-2 border-b-solid pb-2">About Us</h1>
			<p className="text-base text-gray-700 mt-2">This is a website created to share your photographic talents among the world. Participate in contests and show off your skills</p>
		</div>
		</>
	)
}

export default About;
