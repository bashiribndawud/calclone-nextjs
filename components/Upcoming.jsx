import React, { Fragment } from "react";
import { useSession } from "next-auth/client";


function Upcoming({ upcomingEvent }) {
  const [session, loading] = useSession();

  return (
    <Fragment>
      {upcomingEvent.map((event, index) => {
        const { username, length } = event;
        return event.recipient.map((rec) => (
          <>
            <div
              key={index}
              style={{ marginBottom: "1rem" }}
              className="flex justify-between items-center bg-white py-7 px-5 border rounded-sm"
            >
              <div
                style={{ justifyContent: "space-between" }}
                className="flex flex-row justify-between items-start"
              >
                <div>
                  <h3 className="font-semibold font-sans text-base">
                    {new Date(rec.date).toDateString()}
                  </h3>
                  <p className="text-gray-400 text-base font-sans">
                    {new Date(rec.date).toLocaleTimeString()}
                  </p>
                </div>
                <div className="mx-10">
                  <h3 className="text-gray-500 font-sans text-lg">
                    {length} Mins Meeting between {username} and {rec.name}
                  </h3>
                  <p className="text-gray-400 text-lg font-sans">{rec.note}</p>
                  <p className="text-gray-400 text-lg font-sans">{rec.email}</p>
                </div>
              </div>
              {/* End of first flex item */}
              <div>
                <button className="border py-2 px-5 mr-2 text-gray-400">
                  Cancel
                </button>
                <button className="border py-2 px-4 text-gray-400">
                  Reschedule
                </button>
              </div>
            </div>
          </>
        ));
      })}
    </Fragment>
  );
}

export default Upcoming;
