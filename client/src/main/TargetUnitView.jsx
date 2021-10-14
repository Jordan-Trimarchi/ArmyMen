import React, { useContext } from 'react';
import Context from '../context';
import RollToSave from './RollToSave';
import TargetUnitRows from './TargetUnitRows';

const TargetUnitView = () => {
  const { targetUnit } = useContext(Context);

  return (
    <div>
      {targetUnit === 'barrier-vehicle'
        ? (
          <div style={{
            transition: '1s', width: '38.5vw', display: 'flex', flexDirection: 'column', borderRight: 'solid', borderLeft: 'solid', borderBottom: 'solid',
          }}
          >
            <h2 style={{ textDecoration: 'underline', display: 'flex', justifyContent: 'center' }}>Barrier / Vehicle</h2>
            <h3 style={{ display: 'flex', justifyContent: 'center' }}>Obliterate it.</h3>
          </div>
        )
        : null}

      {targetUnit === 'ground'
        ? (
          <div style={{
            transition: '1s', width: '38.5vw', display: 'flex', flexDirection: 'column', borderRight: 'solid', borderLeft: 'solid', borderBottom: 'solid',
          }}
          >
            <h2 style={{ textDecoration: 'underline', display: 'flex', justifyContent: 'center' }}>The Ground</h2>
            <h3 style={{ display: 'flex', justifyContent: 'center' }}>{'It\'s not the fall that kills you, it\'s the sudden stop at the end.'}</h3>
          </div>
        ) : null}
      {targetUnit !== 'ground' && targetUnit !== 'barrier-vehicle'
        ? (
          <div style={{
            transition: '1s', width: '38.5vw', display: 'flex', flexDirection: 'column', borderLeft: 'solid', borderRight: 'solid',
          }}
          >
            <h2 style={{ textDecoration: 'underline', display: 'flex', justifyContent: 'center' }}>
              {`Target: ${targetUnit.name}`}
            </h2>
            <TargetUnitRows />
            <RollToSave />
          </div>
        )
        : null}
    </div>
  );
};

export default TargetUnitView;
