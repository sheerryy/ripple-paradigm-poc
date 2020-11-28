import React, { useState, useEffect } from 'react';
import { Skeleton } from "@material-ui/lab";

import { getAuthors } from "../../../apis/authors/authors.api";
import {BasicTable} from "../../../components";
import {AuthorsRequest} from "../../../types/dtos";

function SaveAuthorForm(){
  const [author, setAuthor] = useState<AuthorsRequest>({
    name: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      const result: any = await getAuthors();

      console.log(`result`, result)
      if (result.errorCode) {
        console.log(result.message)
      } else {
        setAuthors(result);
      }
    };

    fetchData();
  }, []);

  const handleChange = (name: string) => (event: InputEvent) => {
    setAuthor((authorState) => ({
      ...authorState,
      [name]: event?.target?.value,
    }));
  };

  return <></>;
}

export default SaveAuthorForm;