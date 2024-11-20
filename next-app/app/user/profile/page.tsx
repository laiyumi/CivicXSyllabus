import React from "react";

const UserProfilePage = () => {
  return (
    <>
      <div className="flex flex-col gap-8 items-center">
        <h2 className="text-2xl">My Profile</h2>
        <label className="input input-bordered flex items-center gap-2">
          Name
          <input type="text" className="grow" placeholder="Daisy" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Email
          <input type="text" className="grow" placeholder="daisy@site.com" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <kbd className="kbd kbd-sm">⌘</kbd>
          <kbd className="kbd kbd-sm">K</kbd>
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <span className="badge badge-info">Optional</span>
        </label>
      </div>
    </>
  );
};

export default UserProfilePage;
