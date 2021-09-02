import GameManager from "components/GameManager";
import GameRenderer from "components/GameRenderer";
import { Container } from "photoncss/lib/react";
import React from "react";
import { useParams } from "react-router-dom";
import { getGameFromID } from "../src/gameHash";

export const route = "/g/:gameid/:slug";

export default function View(): JSX.Element {

	const { gameid } = useParams<Record<string, string>>();
	const game = getGameFromID(parseInt(gameid));

	console.log(game);

	return (
		<Container style={{ maxWidth: game.width || 800 }}>

			<br/>
			<div className="title">
				<h3>{ game.name }</h3>
			</div>
			<div style={{ margin: 8 }}>
				<GameRenderer game={game}/>
				<GameManager/>
			</div>

		</Container>
	);
}
