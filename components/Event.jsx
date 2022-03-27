import React, {Fragment} from 'react'
import Eventlisting from './eventlisting'
function Event({ authUser, events }) {
  return (
    <Fragment>
      {events.map((event, index) => {
        return (
          <>
            <Eventlisting key={index} {...event} authUser={authUser} />
          </>
        );
      })}
    </Fragment>
  );
}

export default Event