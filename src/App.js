import React from "react";
import { Mutation } from "react-apollo";
import Dropzone from "react-dropzone";
import gql from "graphql-tag";

const uplaodFileMutation = gql`
	mutation($file: Upload!) {
		user_avatar_upload(file: $file) {
			url
			encoding
			mimetype
			path
		}
	}
`;

const createSummary = gql`
mutation(
    $topic: String!
    $course_id: String!
    $introduction: String!
    $file: Upload
  ) {
    create_summary(
      topic: $topic
      course_id: $course_id
      introduction: $introduction
      file: $file
    ) {
      message
      value
    }
  }`;

export default () => (
  <Mutation mutation={createSummary}>
    {mutate => (
      <Dropzone
        onDrop={async ([file]) => {
          try {
            const data = await mutate({
              variables: {
                topic: "Test",
                course_id: "5b7dd11aba05a0001d849c0f",
                introduction: "Test",
                file: file
              }
            });
            console.log(data);
          } catch (err) {
            console.log(err);
          }
        }}
      >
        <p>Drop a file here</p>
      </Dropzone>
    )}
  </Mutation>
);
