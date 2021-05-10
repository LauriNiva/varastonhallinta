import React from 'react';
import NewStorageForm from './NewStorageForm';

function StorageOptions({submitNewStorage}) {
  return (
    <div>
      <NewStorageForm submitNewStorage={submitNewStorage}/>
      
    </div>
  )
};

export default StorageOptions;
