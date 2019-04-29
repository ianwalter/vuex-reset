FROM appjumpstart/station:1.0.1

COPY site/dist .

CMD ["./station"]
