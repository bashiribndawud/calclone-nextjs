import React, {Fragment} from 'react'

function Past() {
  return (
    <Fragment>
      <div className="flex justify-between items-center bg-white py-7 px-5 border rounded-sm">
        <div className="flex justify-around">
          <div>
            <h3 className="font-semibold font-sans text-xl">Wed, 29 Dec</h3>
            <p className="text-gray-400 text-xl font-sans">16:30 - 16:45</p>
          </div>
          <div className="mx-10">
            <h3 className="font-semibold font-sans text-xl">
              15 Min Meeting between Daneil Tonel and Test{" "}
            </h3>
            <p className="text-gray-400 text-lg font-sans">description</p>
            <p className="text-gray-400 text-lg font-sans">Email</p>
          </div>
        </div>
        {/* End of first flex item */}
        <div>
          <button className="border py-2 px-5 mr-2 text-gray-400">
            Cancel
          </button>
          <button className="border py-2 px-4 text-gray-400">Reschedule</button>
        </div>
      </div>
    </Fragment>
  );
}

export default Past