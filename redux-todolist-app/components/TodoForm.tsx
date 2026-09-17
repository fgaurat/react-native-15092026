import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Todo } from '../core/Todo'
import { colors } from '../theme'

interface Props {
  onSubmit: (newTodo: Partial<Todo>) => Promise<void>
}

type FormValues = { title: string }

const TodoForm = ({ onSubmit }: Props) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { title: '' },
  })

  const submit = handleSubmit(async (values) => {
    await onSubmit({ title: values.title.trim() })
    reset()
  })

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Controller
          control={control}
          name="title"
          rules={{
            validate: (v) => v.trim().length > 0 || 'Le titre est obligatoire',
          }}
          render={({ field }) => (
            <TextInput
              style={[styles.input, errors.title && styles.inputError]}
              placeholder="Nouvelle tâche…"
              placeholderTextColor={colors.muted}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              onSubmitEditing={submit}
              returnKeyType="done"
              submitBehavior="blurAndSubmit"
            />
          )}
        />
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={submit}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>Ajouter</Text>
        </Pressable>
      </View>
      {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { gap: 8 },
  row: { flexDirection: 'row', gap: 8 },
  input: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: colors.card,
    color: colors.text,
  },
  inputError: { borderColor: colors.danger },
  button: {
    justifyContent: 'center',
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: colors.accent,
  },
  buttonPressed: { opacity: 0.8 },
  buttonText: { color: colors.accentText, fontWeight: '600', fontSize: 16 },
  error: { color: colors.danger, fontSize: 14 },
})

export default TodoForm