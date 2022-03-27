import React, {Fragment, useState} from "react";
import { PropTypes } from "prop-types";
import { MdOutlineAddAlarm } from "react-icons/md";
import { BsLink45Deg } from "react-icons/bs";
import Neweventform from "./neweventform";
import Link from "next/link";
import { useSession } from 'next-auth/client'

function Eventlisting({ authUser, events }) {

  const [session, loading] = useSession();
  const [showModal, setShowModal] = useState(false);
  return (
    <Fragment>
     
             <div  className="bg-gray-50 basis-4/5 p-9">
               <div className="flex flex-row justify-between items-center">
                 <div>
                   <h3 className="font-sans text-xl font-bold py-3">
                     Event Types
                   </h3>
                   <p className="text-gray-400 text-sm">
                     Create events to share for people to book on your calendar
                   </p>
                 </div>

                 <div>
                   <button
                     onClick={() => setShowModal(true)}
                     className="text-white bg-black py-2 px-2 rounded-sm"
                   >
                     Create New Event
                   </button>
                 </div>
               </div>
              
              {
                events.map((event, index) => {
                  const { title, description, url, length, id } = event;
                  return (
                    <>
                      <div key={index} className="flex flex-row justify-between hover:bg-gray-50 items-center border bg-white p-8 mt-5">
                        <div>
                          <p className="font-sans font-bold text-base">
                            {title}
                            <span className="text-gray-400 text-sm">{url}</span>
                          </p>
                          <p className="font-sans text-base text-gray-400">
                            {description}
                          </p>
                          <div className="flex items-center gap-1 py-2">
                            <MdOutlineAddAlarm className="text-gray-400" />
                            <span className=" text-sm text-gray-400">
                              {length + `m`}
                            </span>
                          </div>
                        </div>
                       
                        <div>
                          <BsLink45Deg
                            onClick={() => {
                              navigator.clipboard.writeText(`${url}/${id}`);
                              alert("Link Copied");
                            }}
                            className="text-gray-400 text-2xl hover:cursor-pointer text-bold"
                            title="Copy Link"
                          />
                        </div>
                      </div>
                    </>
                  );
                })
              }
               

              {/* End of loop */}
               {showModal && (
                 <Neweventform
                   authUser={authUser}
                   setShowModal={setShowModal}
                 />
               )}
             </div>
          
      
     
      

     
    </Fragment>
  );
}

export default Eventlisting;

Eventlisting.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
};
