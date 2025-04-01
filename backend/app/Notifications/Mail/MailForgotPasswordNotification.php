<?php

namespace App\Notifications\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class MailForgotPasswordNotification extends Notification
{
    use Queueable;

    private string $email;
    private string $token;

    /**
     * Create a new notification instance.
     */
    public function __construct(string $email, string $token)
    {
        $this->email = $email;
        $this->token = $token;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $resetUrl = env('WEBAPP_URL').'/auth/reset/'.$this->token.'/'.$this->email;

        return (new MailMessage)
            ->subject('Resete sua senha')
            ->greeting('Olá!')
            ->line('Você está recebendo este email pois solicitou a redefinição da sua senha.')
            ->action('Redefina a senha', $resetUrl)
            ->line('Se você não solicitou a redefinição, por favor, desconsidere este email.');
    }
}
