import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router";
import * as BleepsService from "../../services/bleepsService";

const BleepDetails = (props) => {
	const { bleepId } = useParams();
	const [bleep, setBleep] = useState(null);

	useEffect(() => {
		const fetchBleep = async () => {
			const bleepData = await BleepsService.show(bleepId);
			setBleep(bleepData);
		};
		fetchBleep();
	}, [bleepId]);

	if (!bleep) {
		return <article aria-busy="true"></article>;
	}

	return (
		<main>
			<section>
				<header>
					<p>
						{`${bleep.author.username} posted on ${new Date(
							bleep.createdAt
						).toLocaleDateString()}`}
					</p>
					<p>{bleep.text.toLowerCase()}</p>
				</header>

				<Link to={`/bleeps/${bleepId}/edit`}>Edit</Link>
			</section>

			<section>
				<h2>Comments</h2>
				{!bleep.comments?.length && <p>There are no comments.</p>}

				{bleep.comments?.map((comment) => (
					<article key={comment._id}>
						<header>
							<p>
								{`${comment.author.username} posted on ${new Date(
									comment.createdAt
								).toLocaleDateString()}`}
							</p>
						</header>
						<p>{comment.text}</p>
					</article>
				))}
			</section>
		</main>
	);
};

export default BleepDetails;
