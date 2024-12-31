"use client"
import { Button, Input, Label } from "@repo/ui";
import React, { useRef, useState } from "react";
import UserImage from "./UserImage";
import { SlPencil } from "react-icons/sl";
import { TbCheck } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { useSession } from "next-auth/react";


export default function UserDetailForm() {

  const session = useSession();
  const user = session?.data?.user;
  const nameRef = useRef<HTMLInputElement>(null);

  async function onclickHandler(e: any) {
    e.preventDefault();
    await session.update({ name: nameRef?.current?.value });
    setedit(false);
  }
  const [edit, setedit] = useState<boolean>(false)
  return (
    <form className="flex flex-col gap-4">
      <Label className="mb-2">Profile Picture</Label>
      <div className="flex items-center justify-center">
        <div className="!w-[6rem] !h-[6rem] flex items-center hover:bg-[#030712] p-[0.2rem] justify-center ">
          <UserImage image={user?.image} key={user?.image} />
        </div>
      </div>

      <div>
        <Label className="">Your name</Label>

        <div className="flex gap-3 px-2 items-center">
          <Input placeholder="Enter your name" defaultValue={user?.name ? user?.name : ""} className="p-2 mt-2" disabled={!edit} ref={nameRef} />

          <div>
            {
              !edit && (
                <Button
                  size={"sm"}
                  className="bg-secondary/15 hover:bg-secondary/25"
                  onClick={(e) => {
                    e.preventDefault();
                    setedit(true);
                  }}
                >
                  {<SlPencil className="text-gray-400 text-base" />}
                </Button>
              )
            }

            {
              edit && (
                <div className="flex gap-2">
                  <Button
                    size={"sm"}
                    className="bg-secondary/15 hover:bg-secondary/25"
                    onClick={onclickHandler}
                  >
                    <TbCheck className="text-lg text-green-600" />
                  </Button>

                  <Button
                    size={"sm"}
                    className="bg-secondary/15 hover:bg-secondary/25"
                    onClick={(e) => {
                      e.preventDefault();
                      setedit(false);
                    }}
                  >
                    <RxCross2 className="text-lg text-red-600" />
                  </Button>
                </div>
              )
            }
          </div>

        </div>
      </div>
      <div>
        <Label className="">Your Email</Label>
        <Input disabled placeholder="Enter your name" value={user?.email ? user?.email : ""} className="p-2 mt-2" />
      </div>
    </form>
  );
}
