import React, {Fragment, useState} from 'react'
import Upcoming from './Upcoming'
import Past from './Past'
import Cancelled from './Cancelled'
function Booking({ upcomingEvent }) {
  const [state, setState] = useState("upcoming");
  return (
    <Fragment>
      <div className="bg-gray-50 basis-4/5 p-9">
        <h2 className="font-sans font-semibold text-xl py-2">Bookings</h2>
        <p className="font-sans text-gray-400 text-lg">
          See upcoming and past events booked through your event type links
        </p>
        <div className="flex mt-6">
          <div>
            <button
              onClick={() => setState("upcoming")}
              className="py-4 pr-4 text-black font-semibold font-sans"
            >
              Upcoming
            </button>
          </div>
          <div>
            <button
              onClick={() => setState("past")}
              className="py-4 px-2 text-black font-semibold font-sans"
            >
              Past
            </button>
          </div>
          <div>
            <button
              onClick={() => setState("cancelled")}
              className="py-4 px-2 text-black font-semibold font-sans"
            >
              Cancelled
            </button>
          </div>
        </div>

        {state === "upcoming" && <Upcoming upcomingEvent={upcomingEvent} />}
        {state === "past" && <Past />}
        {state === "cancelled" && <Cancelled />}
      </div>
    </Fragment>
  );
}

export default Booking