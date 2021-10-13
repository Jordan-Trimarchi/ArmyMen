import { Checkbox } from '@material-ui/core';
import React, { useState } from 'react';
import useStyles from './useStyles';
import RollToSave from './RollToSave';

const TargetUnitView = ({
  targetUnit,
  playerUnit,
  targetUnitSaveAug,
  setTargetUnitSaveAug,
  isNearCaptain,
  isNearSergeant,
  setIsNearCaptain,
  setIsNearSergeant,
  rollResult,
  rollToHit,
  usingMortarMechanics,
  usingGrenade,
  isCriticalHit,
  usingSideArm,
}) => {
  const [isBehindDestBarrier, setIsBehindDestBarrier] = useState(false);

  const classes = useStyles();

  const handleSaveAugChange = (event, value) => {
    if (event.target.checked) {
      setTargetUnitSaveAug(targetUnitSaveAug + value);
    } else {
      setTargetUnitSaveAug(targetUnitSaveAug - value);
    }
  };

  return (
    <div
      className="fade-in"
      style={{
        transition: '1s', width: '38.5vw', display: 'flex', flexDirection: 'column', borderLeft: 'solid', borderRight: 'solid',
      }}
    >
      <h2 style={{ textDecoration: 'underline', display: 'flex', justifyContent: 'center' }}>
        Target:
        {' '}
        {targetUnit.name}
      </h2>
      <div className="row">
        <span className="info-point">Inherant Save Requirement Augmentation: </span>
        <span>
          {' '}
          {targetUnit['Save Requirement'] || 0}
        </span>
      </div>
      {playerUnit
        && (
          (playerUnit['Explosive Baseline Save Requirement'] && playerUnit.name !== 'Standing Rifleman')
          || (playerUnit.name === 'Standing Rifleman' && usingGrenade)
        )
        && !usingSideArm
        ? (
          <div className="row">
            <span className="info-point">Explosive Baseline Save Requirement: </span>
            <span>
              {' '}
              {playerUnit['Explosive Baseline Save Requirement'] || playerUnit['Grenade OSR']}
            </span>
          </div>
        )
        : null}
      {playerUnit
        && (playerUnit['Explosive Baseline Save Requirement'] && playerUnit.name !== 'Standing Rifleman')
        && !usingSideArm
        ? (
          <div className="row">
            <span className="info-point">Behind exploding barrier:</span>
            <Checkbox
              className={classes.unitSelect}
              onChange={(event) => {
                handleSaveAugChange(event, -2);
                if (event.target.checked) {
                  setIsBehindDestBarrier(true);
                } else { setIsBehindDestBarrier(false); }
              }}
              checked={isBehindDestBarrier}
            />
          </div>
        )
        : null}
      {targetUnit.name !== 'Captain'
        ? (
          <div className="row">
            <span className="info-point">{'Template #3: Within \'Call to Arms\' radius of Captain:'}</span>
            <Checkbox
              className={classes.unitSelect}
              onChange={(event) => {
                handleSaveAugChange(event, -2);
                if (event.target.checked) {
                  setIsNearCaptain(true);
                } else { setIsNearCaptain(false); }
              }}
              checked={isNearCaptain}
            />
          </div>
        )
        : null}
      {targetUnit.name !== 'Sergeant'
        ? (
          <div className="row">
            <span className="info-point">{'Template #2: Within \'Rally\' radius of Sergeant:'}</span>
            <Checkbox
              className={classes.unitSelect}
              onChange={(event) => {
                handleSaveAugChange(event, -1);
                if (event.target.checked) {
                  setIsNearSergeant(true);
                } else { setIsNearSergeant(false); }
              }}
              checked={isNearSergeant}
            />
          </div>
        )
        : null}
      <div className="row">
        <span className="info-point">Total Save Requirement Augmentation: </span>
        <span>
          {' '}
          {(targetUnitSaveAug || 0)}
        </span>
      </div>
      <RollToSave
        targetUnitSaveAug={targetUnitSaveAug}
        rollResult={rollResult}
        playerUnit={playerUnit}
        usingGrenade={usingGrenade}
        usingSideArm={usingSideArm}
        rollToHit={rollToHit}
        isCriticalHit={isCriticalHit}
        usingMortarMechanics={usingMortarMechanics}
        targetUnit={targetUnit}
      />
    </div>
  );
};

export default TargetUnitView;
