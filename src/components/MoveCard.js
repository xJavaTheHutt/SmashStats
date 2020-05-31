import React, { Component } from 'react';
import '../assets/css/styles.css';
import * as constants from './Constants';

class MoveCard extends Component {
	constructor(props) {
		super(props);
		this.constants = constants;
	}

	ifValueExists(value) {
		if (Array.isArray(value)) {
			return value.length !== 0;
		}

		return value !== 0 && value !== '' && value !== '?' && value !== undefined;
	}

	addNotes(autoCancelBefore, autoCancelAfter, invulnerability, chargeFrame, reflects, absorbs) {
		var notes = '';

		if (this.ifValueExists(autoCancelBefore) && this.ifValueExists(autoCancelAfter)) {
			notes += `Auto cancels before frame ${autoCancelBefore} and after ${autoCancelAfter}. `;
		}
		else if (this.ifValueExists(autoCancelBefore)) {
			notes += `Auto cancels before frame ${autoCancelBefore}. `;
		}
		else if (this.ifValueExists(autoCancelAfter)) {
			notes += `Auto cancels after frame ${autoCancelAfter}. `;
		}

		if (this.ifValueExists(invulnerability)) {
			notes += `Invulnerability on frame(s) ${invulnerability}. `;
		}

		if (this.ifValueExists(chargeFrame)) {
			notes += `Charge frame is ${chargeFrame}. `;
		}

		if (this.ifValueExists(reflects)) {
			notes += `Reflects on frame(s) ${reflects}. `;
		}

		if (this.ifValueExists(absorbs)) {
			notes += `Absorbs on frame(s) ${absorbs}. `;
		}

		return notes.trim();
	}

	render() {
		const {
			moveName,
			FAF,
			gifs,
			IASA,
			BKB,
			WBKB,
			KBG,
			angle,
			damage,
			hitboxActive,
			shieldDamage,
			landingLag,
			lcancelledLandingLag,
			autoCancelBefore,
			autoCancelAfter,
			invulnerability,
			chargeFrame,
			reflects,
			absorbs
		} = this.props.move;

		const notes = this.addNotes(
			autoCancelBefore,
			autoCancelAfter,
			invulnerability,
			chargeFrame,
			reflects,
			absorbs
		);

		return (
			<div className="move-card">
				<div className="move-card-move-name">{moveName}</div>

				{this.ifValueExists(gifs)
          && <div className="hitbox">
          	{gifs.map((value, index) => {
          		return (
          			<div>
          				<img
          					src={require(`../${this.constants.CHARACTER_ASSETS}/${this.constants.MELEE}/${this.props.formattedName}/${value}`)}
          					alt={`Alt: ${value}`}
          					key={index}
          				/>
          			</div>
          		);
          	})}
          </div>
				}
				{this.ifValueExists(hitboxActive) && <div>Hitbox Active: {hitboxActive}</div>}
				<div>FAF: {FAF}</div>
				{this.ifValueExists(IASA) && <div>IASA: {IASA}</div>}
				{this.ifValueExists(damage) && <div>Damage: {damage}</div>}
				{this.ifValueExists(BKB) && <div>BKB: {BKB}</div>}
				{this.ifValueExists(WBKB) && <div>WBKB: {WBKB}</div>}
				{this.ifValueExists(KBG) && <div>KBG: {KBG}</div>}
				{this.ifValueExists(angle) && <div>Angle: {angle}</div>}
				{this.ifValueExists(landingLag) && !this.ifValueExists(lcancelledLandingLag)
          && <div>Landing Lag: {landingLag}</div>
				}
				{this.ifValueExists(landingLag) && this.ifValueExists(lcancelledLandingLag)
          && <div>
            Landing Lag: {landingLag}. L cancel: {lcancelledLandingLag}
          </div>
				}
				{this.ifValueExists(shieldDamage) && <div>Shield Advantage: {shieldDamage}</div>}
				{this.ifValueExists(notes) && <div>Notes: {notes}</div>}
			</div>
		);
	}
}

export default MoveCard;
