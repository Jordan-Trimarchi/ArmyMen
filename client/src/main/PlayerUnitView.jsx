import React, { useEffect, useContext } from 'react';
import MinesAndFalls from './MinesAndFalls';
import Context from '../context';
import PlayerUnitRows from './PlayerUnitRows';

const PlayerUnitView = () => {
  const {
    playerUnit,
    targetUnit,
    rollToHit,
    setRollToHitAug,
    elevation,
    setElevation,
    distance,
    setIsInPartialCover,
    rollResult,
    setRollResult,
    setUsingMortarMechanics,
    usingGrenade,
    setUsingGrenade,
    setIsCriticalHit,
    usingSideArm,
    setUsingSideArm,
    setSpotted,
    setIsInRecon,
    setUnitIsNearCaptain,
    setUnitIsNearSergeant,
    setIsMounted,
    setIsSnipey,
    isSnipey,
  } = useContext(Context);

  useEffect(() => {
    if (playerUnit.name === 'Flamer') { setUsingSideArm(true); }
    setUsingGrenade(false);
    setIsMounted(false);
    setIsSnipey(false);
    setUnitIsNearCaptain(false);
    setUnitIsNearSergeant(false);
    setIsInPartialCover(false);
    setSpotted(false);
    setIsInRecon(false);
    setRollToHitAug(0);
    setUsingSideArm(false);
    setRollResult('');
    setElevation('');
  }, [playerUnit]);

  useEffect(() => {
    if (rollResult === '20' || (rollResult >= rollToHit && isSnipey)) {
      setIsCriticalHit(true);
    } else {
      setIsCriticalHit(false);
    }
  }, [rollResult, isSnipey]);

  useEffect(() => {
    if ((playerUnit.name === 'Mortar' && !usingSideArm) || (playerUnit.name === 'Standing Rifleman' && usingGrenade) || (playerUnit.name === 'Bazooka' && elevation > distance / 2)) {
      setUsingMortarMechanics(true);
    } else {
      setUsingMortarMechanics(false);
    }
  }, [playerUnit, usingGrenade, usingSideArm, elevation, distance, rollToHit, rollResult]);

  return (
    <div
      className="fade-in"
      style={{
        transition: '1s', width: '38.5vw', display: 'flex', flexDirection: 'column', borderRight: 'solid', borderLeft: 'solid',
      }}
    >
      <h2 style={{ textDecoration: 'underline', display: 'flex', justifyContent: 'center' }}>
        {`Unit: ${playerUnit.name}`}
      </h2>
      {playerUnit && targetUnit
        ? <PlayerUnitRows />
        : null}

      <MinesAndFalls />

      <h3 style={{ textDecoration: 'underline' }}>Unit Stats</h3>
      {Object.keys(playerUnit).map((item) => {
        const styles = {};
        if (playerUnit[item].length > 93) { styles.textDecoration = 'underline'; }
        return item !== 'name' ? (
          <div className="row">
            <span style={styles} className="info-point">
              {`${item}:`}
            </span>
            <span>
              {playerUnit[item]}
            </span>
          </div>
        ) : null;
      })}
    </div>
  );
};

export default PlayerUnitView;
