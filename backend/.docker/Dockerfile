FROM php:8.2-fpm

LABEL maintainer="EasyCreche"

# Atualiza e instala as dependências necessárias
RUN apt-get update -yqq && \
    apt-get install -yqq --no-install-recommends \
    apt-transport-https \
    libpq-dev \
    zip \
    unzip && \
    rm -rf /var/lib/apt/lists/*

# Instala extensões do PHP
RUN docker-php-ext-install pdo pdo_pgsql

# Instala e habilita a extensão Redis apenas se não estiver instalada
RUN if ! php -m | grep -q 'redis'; then pecl install redis && docker-php-ext-enable redis; fi

# Instala o Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Define o diretório de trabalho
WORKDIR /var/www/html
