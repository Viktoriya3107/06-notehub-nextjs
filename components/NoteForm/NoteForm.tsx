'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import type { NoteTag } from '@/types/note';

const schema = Yup.object({
  title: Yup.string().min(3).max(50).required(),
  content: Yup.string().max(500),
  tag: Yup.string().required(),
});

export default function NoteForm({
  onClose,
}: {
  onClose: () => void;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  return (
    <Formik
      initialValues={{
        title: '',
        content: '',
        tag: 'Todo' as NoteTag,
      }}
      validationSchema={schema}
      onSubmit={(values) => mutation.mutate(values)}
    >
      <Form>
        <Field name="title" placeholder="Title" />
        <ErrorMessage name="title" />

        <Field as="textarea" name="content" />
        <ErrorMessage name="content" />

        <Field as="select" name="tag">
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </Field>

        <ErrorMessage name="tag" />

        <button type="button" onClick={onClose}>
          Cancel
        </button>

        <button type="submit">
          Create note
        </button>
      </Form>
    </Formik>
  );
}